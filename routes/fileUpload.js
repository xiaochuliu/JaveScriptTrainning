var express = require('express');
var multer  = require('multer');
var path = require('path');

var OSS = require('../utils/oss');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + '/../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

var router = express.Router();
var oss = new OSS();

router.post('/upload', upload.single('uploadedFile'), function(req, res) {

  var filename = req.file.originalname;
  var token = req.body.token;

  useOrCreateBucket(filename, token, function(err, response) {
    var translated = {
      urn: response.urn,
      file: filename
    };
    res.end(JSON.stringify(translated));
  });
});

var useOrCreateBucket = function(filename, token, callback) {

  var accessToken = token;
  var bucket =
      'model'
    + new Date ().toISOString ().replace (/T/, '-').replace (/:+/g, '-').replace (/\..+/, '')
    + '-' + accessToken.toLowerCase().replace (/\W+/g, '') ;
  var policy = 'transient';

  oss.setBucket(bucket);
  oss.setToken(accessToken);


  oss.checkBucket(function(err, res) {
    if (err) {
      oss.createBucket(null, function(err, res) {
        uploadToOSS(filename, callback);
      });
    } else {
      uploadToOSS(filename, callback);
    }
  });
};

var uploadToOSS = function(filename, callback) {
  oss.upload(filename, function(err, res) {
    if (err) {
      console.log('ERR', err);
    } else {
      var urn = res.objectId;
      oss.translate(urn, callback);
    }
  });
};

module.exports = router;
