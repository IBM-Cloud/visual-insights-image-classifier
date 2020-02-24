'use strict';
const express = require('express')
const request = require('request');
const app = express()
const path = require('path')
require('dotenv').config({
  silent: true,
});

const port = 3000
const MISSING_ENV =
  'Missing required runtime environment variable POWERAI_VISION_WEB_API_URL';

const poweraiVisionWebApiUrl = process.env.POWERAI_VISION_WEB_API_URL;

console.log('Web API URL: ' + poweraiVisionWebApiUrl);

if (!poweraiVisionWebApiUrl) {
  console.log(MISSING_ENV);
}

app.use(express.static('public'))
/*
* Default route for the web app
*/
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})
/*
* Upload an image for classification
*/
app.post('/uploadimage', function(req, res) {
  if (!poweraiVisionWebApiUrl) {
    console.log(MISSING_ENV);
    res.send({data: JSON.stringify({error: MISSING_ENV})});
  } else {
    req.pipe(request.post({
      url: poweraiVisionWebApiUrl,
      gzip: true,
      agentOptions: {
        rejectUnauthorized: false,
      }}, function(err, resp, body) {
      if (err) {
        console.log(err);
      }
      console.log(body);
      res.send({data: body});
    }));
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`))