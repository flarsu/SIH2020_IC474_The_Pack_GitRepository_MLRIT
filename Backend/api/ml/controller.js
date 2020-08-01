const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const fs = require('fs');
const ocrSpaceApi2 = require('ocr-space-api-alt2');
const SummarizerManager = require('node-summarizer').SummarizerManager;
const tr = require('googletrans').default;

exports.ocr = asyncHandler(async (req, res, next)=>{
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
