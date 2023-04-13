var express = require('express');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var router = express.Router();

/* GET download. */
router.get('/', async (req, res, next) => {

    ytdl.getInfo(req.query.url).then(info => {
        res.header('Content-Disposition', `attachment; filename=${
            (info.videoDetails.title).replace(/[^\x00-\x7F]/g, "")
        }.mp3`);
        let stream = ytdl(req.query.url, {quality: 'highestaudio'});
        ffmpeg(stream).format('mp3').pipe(res);
    })
});

module.exports = router;
