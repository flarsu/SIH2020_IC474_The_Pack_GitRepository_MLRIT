const express = require('express');
const {protect} = require('../../middleware/auth');
const {ocr, summary, translate, imageSearch, textToSpeech, wordpos, video, getAllVideos} = require('./controller');
// eslint-disable-next-line new-cap
const router = express.Router();
router.route('/ocr').post(protect, ocr);
router.route('/summary').post(protect, summary);
router.route('/translate').post(protect, translate);
router.route('/image').post(protect, imageSearch);
router.route('/speech').post(protect, textToSpeech);
router.route('/wordpos').post(protect, wordpos);
router.route('/video').post(protect, video);
router.route('/allVideos').get(protect, getAllVideos);

module.exports = router;
