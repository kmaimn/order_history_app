var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var orders = require('./routes/order');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, './public')));

//routes
app.use('/orders', orders);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.set('port', 5000);

app.listen(process.env.PORT || app.get('port'), function () {
  console.log('Listening at port ', app.get('port'));

});
