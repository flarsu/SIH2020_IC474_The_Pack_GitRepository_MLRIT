const express = require('express');
const {ocr, summary, translate} = require('./controller');
// eslint-disable-next-line new-cap
const router = express.Router();
router.route('/ocr').post(ocr);
router.route('/summary').post(summary);
router.route('/translate').post(translate);
module.exports = router;
