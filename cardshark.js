var express = require('express');
var app = express();

app.get('/cards', function(req, res){
var cardResponse = 'cards!!!\n';
    console.log(req.query.card[0]);
    console.log(req.query.card[1]);
  res.send(req.query.card);
});

var server = app.listen(9000, function() {
    console.log('Listening on port %d', server.address().port);
});