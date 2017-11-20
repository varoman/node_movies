'use strict';

const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
var bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

var server = app.listen(4201, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

app.get('/getMovies', function (req, res) {
	db.findDocuments().then(function (data) {
		res.end(JSON.stringify(data));
	});
});

app.post('/addMovies', function (req, res) {
	db.insertDocument(req.body)
  res.end('inserted');
});

