var baseUrl = 'https://developer.api.autodesk.com';
var version = 'v1';
var credentials = {
  // Replace placeholder below by the Consumer Key and Consumer Secret you got from
  // http://developer.autodesk.com/ for the production server
  clientId: process.env.CONSUMER_KEY || '<replace with your consumer key>',
  clientSecret: process.env.CONSUMER_SECRET || '<replace with your consumer secret>',
  grantType: 'client_credentials',

  authenticationUrl: baseUrl + '/authentication/' + version + '/authenticate'
};

module.exports = credentials;
