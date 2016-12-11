var favicon = require('serve-favicon');
var express = require('express');
var bodyParser = require('body-parser');

var fileUpload = require('./routes/fileUpload');
var token = require('./routes/token');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/www'));
app.use(favicon(__dirname + '/www/images/favicon.ico'));

// Use this route for proxying access token requests
app.use('/api', fileUpload);
app.use('/api', token);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});
