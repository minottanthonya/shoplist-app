//require dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);

//next I need to make static files available
app.use(express.static(__dirname));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT || 3000, function() {
  console.log("listening on port 3000");
});

