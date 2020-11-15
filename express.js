const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen("8801");
setInterval(() => {
  http.get(`http://156.38.135.35`);
}, 280000);