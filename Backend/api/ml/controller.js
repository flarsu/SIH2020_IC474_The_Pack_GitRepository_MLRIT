const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const ocrSpaceApi2 = require('ocr-space-api-alt2');
const SummarizerManager = require('node-summarizer').SummarizerManager;
const tr = require('googletrans').default;
const axios = require('axios').default;
const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const readline = require('readline-sync');
const xmlbuilder = require('xmlbuilder');
const textToSpeechSubscriptionKey = process.env.textToSpeechSubscriptionKey;
const imageSearchSubscriptionKey = process.env.imageSearchSubscriptionKey;
const WordPOS = require('wordpos');
const wordpos = new WordPOS();
const videoshow = require('videoshow');
const sharp = require('sharp');


exports.ocr = asyncHandler(async (req, res, next) => {
  const image = req.files.image;
  const imageFilePath = `./public/uploads/${Date.now()}.png`;
  const options = {
    apikey: '89eef7631588957',
    filetype: 'png',
    verbose: true,
    isTable: true,
    OCREngine: 2,
    language: 'eng',
  };
  fs.writeFileSync(imageFilePath, image.data, 'utf8');
  const result = await ocrSpaceApi2(imageFilePath, options);
  res.status(200).json({
    success: true,
    result: result.data.ParsedResults[0].ParsedText,
    detailedResult: result.data.ParsedResults,
  });
});

exports.summary = asyncHandler(async (req, res, next) => {
  const text = req.body.text;
  const Summarizer = new SummarizerManager(text, 5);
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
    const url = `https://sih.cognitiveservices.azure.com/bing/v7.0/images/search?q=${nouns[i]}&imageType=Clipart`;
    const result = await axios.get(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': imageSearchSubscriptionKey,
      },
    });
    const url1 = result.data.value[0].thumbnailUrl;
    const path = `images/${nouns[i]}_main.jpeg`;
    download(url1, path, async () => {
      await sharp(path)
          .resize({height: 600, width: 600})
          .toFile(`images/${nouns[i]}.jpeg`);
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
  const token = await getAccessToken(textToSpeechSubscriptionKey);
  await textToSpeech(token, text);
  res.status(200).json({
    success: true,
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
  const images = [];
  Object.keys(req.body).forEach(function(key) {
    images.push({
      path: `images/${req.body[key]}.jpeg`,
      caption: `${key}`,
    });
  });
  console.log(images);
  const videoOptions = {
    fps: 25,
    loop: 1.2, // seconds
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
      .audio('audio/1595575142053.mp3')
      .save('video/1595575142053.mp4')
      .on('start', function(command) {
        console.log('ffmpeg process started:', command);
      })
      .on('error', function(err, stdout, stderr) {
        console.error('Error:', err);
        console.error('ffmpeg stderr:', stderr);
      })
      .on('end', function(output) {
        console.error('Video created in:', output);
        res.status(200).json({
          success: true,
        });
      });
});

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

async function textToSpeech(accessToken, text) {
  // Create the SSML request.
  const xml_body = xmlbuilder.create('speak')
      .att('version', '1.0')
      .att('xml:lang', 'en-us')
      .ele('voice')
      .att('xml:lang', 'en-us')
      .att('name', 'en-IN-NeerjaNeural')
      .ele('prosody')
      .att('rate', '-17%')
      .att('pitch', '18%')
      .txt(text)
      .end();
    // Convert the XML into a string to send in the TTS request.
  const body = xml_body.toString();

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

  const request = rp(options)
      .on('response', (response) => {
        if (response.statusCode === 200) {
          request.pipe(fs.createWriteStream(`audio/${Date.now()}.mp3`));
          console.log('\nYour file is ready.\n');
        }
      });
  return request;
}

const download = async (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback);
  });
};
