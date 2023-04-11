var express = require('express');
var ytdl = require('ytdl-core');
var router = express.Router();


/* GET download. */
router.get('/', async (req, res, next) => {
  ytdl.getInfo(req.query.url).then(info => {
    res.header('Content-Disposition', `attachment; filename=${info.videoDetails.title}.webm`);
    ytdl(req.query.url, {filter: 'audioonly', format: 'webm'}).pipe(res);
  })
});

module.exports = router;
