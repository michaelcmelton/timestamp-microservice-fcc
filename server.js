// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment');

// Set static routes and set view engine as pug
app.use(express.static('public'));
app.set('view engine', 'pug');


// Pug entry point to API

app.get('/', function (req, res) {
  res.render('index', { title: 'Timestamp Microservice API'})
});

app.get('/time/:time',function (req,res) {
  var time = req.params.time;
  if(moment.unix(time).isValid()){
  var unix_t = moment.unix(time).format('x').toString();
  var natural_t = moment.unix(time).format('MMMM DD, YYYY').toString();
  var timejson = JSON.stringify({"timestamp": natural_t, "unix timestamp": unix_t}); 
  res.end(timejson);
  } 
  if(moment(time).isValid()){
  var unix_t = moment(time).format('x').toString();
  var natural_t = moment(time).format('MMMM DD, YYYY').toString();
  var timejson = JSON.stringify({"timestamp": natural_t, "unix timestamp": unix_t}); 
  res.end(timejson);
  } else{res.end(JSON.stringify({"timestamp": null, "unix timestamp": null}));}
  
});

// listen for requests :)

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
