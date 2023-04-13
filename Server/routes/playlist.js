var express = require("express");
var ytpl = require("ytpl");
var router = express.Router();

/* GET download playlist. */
router.get("/", async (req, res) => {
  let playlist;
  let failed = false;
  let info = {};
  const shortUrls = [];
  const videoNames = [];
  try {
    playlist = await ytpl(req.query.url);
  } catch (err) {
    failed = true;
    console.log(err);
    res.status(400).send("invalid_url");
  }
  if (!failed) {
    info.playlistLen = playlist.items.length;
    for (let i = 0; i < playlist.items.length; i++) {
      shortUrls.push(playlist.items[i].shortUrl);
      videoNames.push(playlist.items[i].title);
    }
    info.URLs = shortUrls;
    info.Names = videoNames;
    res.json(info);
  }
});

module.exports = router;
