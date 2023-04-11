var express = require('express');
var ytdl = require('ytdl-core');
var router = express.Router();


/* GET download. */
router.get('/', async (req, res, next) => {
  res.header('Content-Disposition', `attachment; filename=audio.webm`);
  ytdl(req.query.url, {filter: 'audioonly', format: 'webm'}).pipe(res);
});

module.exports = router;
