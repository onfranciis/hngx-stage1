const express = require("express");
const { dayOfTheWeek } = require("./util");
const app = express();
const PORT = process.env.PORT || 1234;
const now = Date.now();
const utcTime = new Date();
const gmtPlus1Date = new Date(utcTime.toUTCString()).getTime() + 60 * 60 * 1000;
const currentDay = dayOfTheWeek(utcTime.getDay());
const iso = new Date(gmtPlus1Date).toISOString().slice(0, 19) + "Z";

app.get("/", (req, res) => {
  res.send({ connected: true });
});

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  if (!slack_name?.trim() || !track?.trim()) {
    return res.status(400).send({
      message: `Missing either "slack_name" or "track" query`,
    });
  }

  res.json({
    slack_name,
    current_day: currentDay,
    utc_time: iso,
    track,
    github_file_url:
      "https://www.github.com/onfranciis/hngx-stage-1/blob/main/server.js",
    github_repo_url: "https://www.github.com/onfranciis/hngx-stage-1",
    status_code: 200,
  });
});

app.listen(PORT, () => {
  console.log(`...server is running on port ${PORT}`);
});

/*
2023-09-07T10:58:47.749Z
2023-09-07T11:01:27Z
*/

// 2023-09-07T18:10:50Z
// 2023-09-07T18:12:53Z
