const express = require('express');
const {ocr, summary, translate, imageSearch, textToSpeech, wordpos, video} = require('./controller');
// eslint-disable-next-line new-cap
const router = express.Router();
router.route('/ocr').post(ocr);
router.route('/summary').post(summary);
router.route('/translate').post(translate);
router.route('/image').post(imageSearch);
router.route('/speech').post(textToSpeech);
router.route('/wordpos').post(wordpos);
router.route('/video').post(video);

module.exports = router;
