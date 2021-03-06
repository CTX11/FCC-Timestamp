// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Solution below // 

app.get("/api/:date?", (req, res) => {
  const date_string = req.params.date;
  let isValid = new Date(date_string);
  if (isValid != 'Invalid Date') {
    res.json ({
      unix: new Date(date_string).valueOf(),
      utc: new Date(date_string).toUTCString()
    });
  } else {
    let milliseconds = new Date(parseInt(date_string)).valueOf();

    if(parseInt(date_string) == milliseconds) {
      res.json({
        unix: milliseconds,
        utc: new Date(parseInt(date_string)).toUTCString()
      });
    } else {
      if (date_string == null) {
        res.json ({
          unix: new Date().valueOf(),
          utc: new Date().toUTCString()
        });
      } else {
        res.json({
          error: "Invalid Date"
        });
      }
    }
  }
});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
