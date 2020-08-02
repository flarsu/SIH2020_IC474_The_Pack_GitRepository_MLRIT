const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const ocrSpaceApi2 = require('ocr-space-api-alt2');
const SummarizerManager = require('node-summarizer').SummarizerManager;
const tr = require('googletrans').default;
const axios = require('axios');
const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const xmlbuilder = require('xmlbuilder');
const textToSpeechSubscriptionKey = process.env.textToSpeechSubscriptionKey;
const imageSearchSubscriptionKey = process.env.imageSearchSubscriptionKey;
const WordPOS = require('wordpos');
const wordpos = new WordPOS();
const videoshow = require('videoshow');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const Video = require('./model');
const Jimp = require('jimp');

exports.ocr = asyncHandler(async (req, res, next) => {
  const image = req.files.image;
  const imageFilePath = `./public/uploads/${Date.now()}.png`;
  fs.writeFileSync(imageFilePath, image.data, 'utf8');
  const fileContent = fs.readFileSync(imageFilePath);
  const params = {
    Bucket: process.env.S3_Bucket_Name,
    Key: `${Date.now()}_ocr`,
    Body: fileContent,
  };
  s3.upload(params, async function(err, data) {
    if (err) {
      return res.status(500).send({
        message: 'File upload failed',
        error: err,
      });
    }
    console.log(data.Location);
    const result = await ocr(data.Location);
    console.log(result);
    res.status(200).json({
      success: true,
      result,
    });
  });
});

exports.summary = asyncHandler(async (req, res, next) => {
  const text = req.body.text;
  const textArray = text.split('.');
  const Summarizer = new SummarizerManager(text, (textArray.length / 2)+1);
  const summary = Summarizer.getSummaryByFrequency().summary;
  res.status(200).json({
    success: true,
    summary,
  });
});

exports.translate = asyncHandler(async (req, res, next) => {
  const text = req.body.text;
  const toLang = req.body.toLang;
  const result = await tr(text, {from: 'auto', to: toLang});
  res.status(200).json({
    success: true,
    result,
  });
});

exports.imageSearch = asyncHandler(async (req, res, next) => {
  const text = req.body.text;
  const nouns = text.split(',');
  for (let i = 0; i < nouns.length; i++) {
    if (fs.existsSync(`pictures/${nouns[i]}.jpeg` && i !== nouns.length - 1)) {
      continue;
    }
    const url = `https://sih.cognitiveservices.azure.com/bing/v7.0/images/search?q=${nouns[i]}&imageType=Clipart`;
    const result = await axios.get(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': imageSearchSubscriptionKey,
      },
    });
    const url1 = result.data.value[0].thumbnailUrl;
    const path = `pictures/${nouns[i]}_main.jpeg`;
    download(url1, path, async () => {
      // await sharp(path)
      //     .resize({height: 600, width: 600})
      //     .toFile(`pictures/${nouns[i]}.jpeg`);
      const lenna = await Jimp.read(path);
      lenna
          .resize(600, 600) // resize
          .quality(100) // set JPEG quality
          .write(`pictures/${nouns[i]}.jpeg`); // save
      fs.unlinkSync(path);
      if (i === nouns.length - 1) {
        return res.status(200).json({
          success: true,
          result: result.data,
        });
      }
    });
  }
});

exports.textToSpeech = asyncHandler(async (req, res, next) => {
  const text = req.body.text;
  const result = await wordpos.getPOS(text);
  console.log(result.adjectives);
  const token = await getAccessToken(textToSpeechSubscriptionKey);
  let lang;
  let voice;
  if (req.body.toLang === 'hi') {
    lang = 'hi-IN';
    voice = 'hi-IN-SwaraNeural';
  } else if (req.body.toLang === 'ru') {
    lang = 'ru-RU';
    voice = 'ru-RU-DariyaNeural';
  } else {
    lang = 'en-IN';
    voice = 'en-IN-NeerjaNeural';
  }
  const {fileName} = await textToSpeech(token, text, lang, voice);
  res.status(200).json({
    success: true,
    fileName,
  });
});

exports.wordpos = asyncHandler(async (req, res, next) => {
  const text = req.body.text;
  const result = await wordpos.getPOS(text);
  res.status(200).json({
    success: true,
    result: result.nouns.join(),
  });
});

exports.video = asyncHandler(async (req, res, next) => {
  const audioFile = req.body.audioFile;
  const images = [];
  console.log(req.body);
  Object.keys(req.body).forEach(function(key) {
    if (key !== 'audioFile' && key !== 'text') {
      const loop = Math.ceil(key.split(' ').length*0.4);
      images.push({
        path: `pictures/${req.body[key]}.jpeg`,
        caption: `${key}`,
        loop,
        captionDelay: 10,
        captionStart: 10,
        transitionDuration: 0.0001,
      });
    }
  });
  const videoOptions = {
    fps: 25,
    transition: true,
    transitionDuration: 0.2, // seconds
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p',
  };

  videoshow(images, videoOptions)
      .audio(`audio/${audioFile}.mp3`)
      .save(`video/${audioFile}.mp4`)
      .on('start', function(command) {
      })
      .on('error', function(err, stdout, stderr) {
        console.log(stdout);
        console.error('Error:', err);
        console.error('ffmpeg stderr:', stderr);
      })
      .on('end', function(output) {
        const fileContent = fs.readFileSync(`video/${audioFile}.mp4`);
        const params = {
          Bucket: process.env.S3_Bucket_Name,
          Key: `${audioFile}.mp4`,
          Body: fileContent,
          ContentType: 'video/mp4',
        };
        s3.upload(params, async function(s3Err, data) {
          if (s3Err) throw s3Err;
          fs.unlinkSync(`video/${audioFile}.mp4`);
          fs.unlinkSync(`audio/${audioFile}.mp3`);
          const user = await Video.findOne({userId: req.user._id});
          if (user) {
            await Video.findByIdAndUpdate(user._id,
                {$push:
                    {videoLinks: {content: req.body.text, link: data.Location}},
                },
            );
          } else {
            await Video.create({userId: req.user._id},
                {videoLinks: {content: req.body.text, link: data.Location}},
            );
          }
          res.status(200).json({
            success: true,
            s3link: data.Location,
          });
        });
      });
});

exports.getAllVideos = asyncHandler(async (req, res, next) => {
  const result = await Video.findOne({userId: req.user._id});
  res.status(200).json({
    success: true,
    result,
  });
});


// eslint-disable-next-line require-jsdoc
async function getAccessToken(subscriptionKey) {
  const options = {
    method: 'POST',
    uri: process.env.textToSpeechEndpoint,
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
  };
  return rp(options);
}

async function textToSpeech(accessToken, text, lang, voice) {
  // Create the SSML request.
  text = text.toString().replace('.', '');
  const xml_body = xmlbuilder
      .create('speak')
      .att('version', '1.0')
      .att('xml:lang', lang)
      .ele('voice')
      .att('xml:lang', lang)
      .att('name', voice)
      .ele('prosody')
      .att('rate', '-18%')
      .att('pitch', '18%')
      .ele('break')
      .att('strength', 'none')
      .att('time', '0ms')
      .txt(text)
      .end();
  // Convert the XML into a string to send in the TTS request.
  let body = xml_body.toString();
  body = body.replace('</break>', '');
  body = body.replace(
      '<break strength="none" time="0ms">',
      '<break strength="none" time="0ms" />',
  );
  console.log(body);
  const options = {
    method: 'POST',
    baseUrl: 'https://eastus.tts.speech.microsoft.com/',
    url: 'cognitiveservices/v1',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'cache-control': 'no-cache',
      'User-Agent': 'SIHSpeech',
      'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
      'Content-Type': 'application/ssml+xml',
    },
    body: body,
  };
  const fileName = Date.now();
  const request = rp(options).on('response', (response) => {
    if (response.statusCode === 200) {
      request.pipe(fs.createWriteStream(`audio/${fileName}.mp3`));
    }
  });
  return {request, fileName};
}

async function ocr(imageLocation) {
  let result = await axios({
    method: 'post',
    url: 'https://sihocr.cognitiveservices.azure.com/vision/v1.0/ocr?language=unk&detectOrientation=true',
    data: {'url': `${imageLocation}`},
    headers: {
      'cache-control': 'no-cache',
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': `${process.env.ocrKey}`,
    },
  });
  result = result.data;
  console.log(result);
  let text='';
  for (let i=0; i<result.regions[0].lines.length; i++) {
    for (let j=0; j<result.regions[0].lines[i].words.length; j++) {
      text+=result.regions[0].lines[i].words[j].text + ' ';
    }
  }
  return text;
}


const download = async (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on('close', callback);
  });
};
