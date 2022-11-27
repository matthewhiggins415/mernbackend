const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const fs = require('fs');

const { Lesson } = require('../models/courseModel')

const requireToken = passport.authenticate('bearer', { session: false });

router.get('/video/:video', async (req, res, next) => {
  let videoTitle = req.params.video;

  let range = req.headers.range;

  const videoPath = path.join(__dirname, `../videos/${videoTitle}`);

  const videoSize = fs.statSync(videoPath).size;

  const chunkSize = 1 * 1e6;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mkv"
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, {start, end});

  stream.pipe(res);
})



module.exports = router