var unirest = require('unirest');
var util = require('util');



var config = require('../config');

function OSS(bucketName, accessToken) {
  this.bucket = bucketName;
  this.accessToken = accessToken;
}

OSS.prototype.setBucket = function(bucket) {
  this.bucket = bucket;
};

OSS.prototype.setToken = function(accessToken) {
  this.accessToken = accessToken;
};

// GET /oss/v2/buckets/:bucket/details
OSS.prototype.checkBucket = function(callback) {
};

// POST /oss/v2/buckets
OSS.prototype.createBucket = function(policy, callback) {
  // your code here

};

// PUT /oss/v2/buckets/:bucket/objects/:filename
OSS.prototype.upload = function(filename, callback) {
  // your code here

};



// POST /modelderivative/v2/designdata/job
OSS.prototype.translate = function(urn, callback) {
  // your code here

};





module.exports = OSS;
