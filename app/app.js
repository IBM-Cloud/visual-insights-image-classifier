'use strict';
const express = require('express')
const app = express()
const path = require('path')
const axios = require('axios')
const port = 3000

var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': '52.116.128.63',
  'path': '/powerai-vision/api/dlapis/81b5e688-302b-4ad6-a834-545bee34e13b',
  'headers': {
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

const request = require('request');
const MISSING_ENV =
  'Missing required runtime environment variable POWERAI_VISION_WEB_API_URL';

require('dotenv').config({
  silent: true,
});

const poweraiVisionWebApiUrl = process.env.POWERAI_VISION_WEB_API_URL;

console.log('Web API URL: ' + poweraiVisionWebApiUrl);

if (!poweraiVisionWebApiUrl) {
  console.log(MISSING_ENV);
}

app.use(express.static('public'))

 var options = {
  'method': 'POST',
  'hostname': '52.116.128.63',
  'path': '/powerai-vision/api/dlapis/81b5e688-302b-4ad6-a834-545bee34e13b',
  'headers': {
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20,
  'rejectUnauthorized': false
};
/*
* Default route for the web app
*/
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})
/*
* Upload the image for classification
*/
app.post('/uploadpic', function(req, res) {
//console.log(req.);

/*var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = "Content-Disposition: form-data; name=\"files\";filename="+req.files.files.name+"\r\nContent-Type: \"{Insert_File_Content_Type}\"\r\n\r\n" + fs.readFileSync(req.files.files.path);
req.setHeader('content-type', 'multipart/form-data');

req.write(postData);

req.end();*/
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

app.post('/upload', (req, res) => {
    var bodyFormData = new FormData();
    bodyFormData.append('image', req.file); 
    axios({
    method: 'post',
    url: 'https://52.116.128.63/powerai-vision/api/dlapis/81b5e688-302b-4ad6-a834-545bee34e13b',
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
    /*if(req.file) {
        res.json(req.file);
    }
    else throw 'error';*/
});


app.listen(port, () => console.log(`App listening on port ${port}!`))