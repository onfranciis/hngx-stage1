const express = require("express");
const { dayOfTheWeek } = require("./util");
const app = express();
const PORT = process.env.PORT || 1234;
const now = new Date();
const currentDay = dayOfTheWeek(now.getUTCDay());
const utc = now.toISOString();

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

  res.send({
    slack_name,
    current_day: currentDay,
    utc_time: utc,
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
