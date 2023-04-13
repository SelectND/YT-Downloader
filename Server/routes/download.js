var express = require("express");
var ytdl = require("ytdl-core");
var ffmpeg = require("fluent-ffmpeg");
var https = require("https");
var router = express.Router();

let UrlExists = (id) => {
  return new Promise((resolve) => {
    https.get(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`, (res) => {
      let code = res.statusCode;
      resolve(code);
    });
  });
};

let getId = (url) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

/* GET download. */
router.get("/", async (req, res) => {
  if (getId(req.query.url) !== false) {
    let statusCode = await UrlExists(getId(req.query.url));
    if (statusCode === 200) {
      ytdl.getInfo(req.query.url).then((info) => {
        res.header(
          "Content-Disposition",
          `attachment; filename=${info.videoDetails.title.replace(
            // eslint-disable-next-line no-control-regex
            /[^\x00-\x7F]/g,
            ""
          )}.mp3`
        );
        let stream = ytdl(req.query.url, { quality: "highestaudio" });
        ffmpeg(stream).format("mp3").pipe(res);
      });
    } else {
      res.status(400).send("The url you entered is not a valid YouTube url!");
    }
  } else {
    res.status(400).send("The url you entered is not a valid YouTube url!");
  }
});
module.exports = router;
