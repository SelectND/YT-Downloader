/*var express = require('express');
var ytpl = require('ytpl');
var ffmpeg = require('fluent-ffmpeg');
var ytdl = require('ytdl-core');
var fs = require('fs');

var router = express.Router();

/* GET download playlist. *//*
router.get('/', async (req, res, next) => {
    const playlist = await ytpl(req.query.url);
    if (! fs.existsSync('download')) {
        fs.mkdir('download', (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
    for (let i = 0; i < playlist.items.length; i++) {
        await ytdl.getInfo(playlist.items[i].shortUrl).then(info => {
            let fileName = `./download/${
                (info.videoDetails.title).replace(/[^\x00-\x7F]/g, "")
            }.mp3`;
            let stream = ytdl(playlist.items[i].shortUrl, {quality: 'highestaudio'});
            ffmpeg(stream).format('mp3').pipe(fs.createWriteStream(fileName));

        });
    }
    res.send('a');


});

module.exports = router;
*/


var express = require('express');
var ytpl = require('ytpl');
var router = express.Router();


/* GET download playlist. */
router.get('/', async (req, res, next) => {
    let info = {};
    const shortUrls = [];
    const videoNames = [];
    const playlist = await ytpl(req.query.url);
    info.playlistLen = playlist.items.length;
    for(let i = 0; i < playlist.items.length; i++) {
        shortUrls.push(playlist.items[i].shortUrl);
        videoNames.push(playlist.items[i].title);
    }
    info.URLs = shortUrls;
    info.Names = videoNames;
    res.json(info);
});

module.exports = router;
