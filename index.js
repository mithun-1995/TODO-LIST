var express = require('express');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var todo = require('./routes/todo');

var app = express();
///
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/', users);
app.use('/api/v1/todo', todo);

app.listen(8080, function(){
  console.log("Listing to port: 8080")
})

module.exports = app;