
var config = {
  credentials: {
    grant_type: 'client_credentials'
  },

  // If you which to use the Autodesk View & Data API on the staging server, change this url
  BaseEndPoint: 'https://developer.api.autodesk.com',
  Version: 'v1',
  Version2: 'v2'
};

config.AuthenticateEndPoint = config.BaseEndPoint + '/authentication/' + config.Version + '/authenticate';

config.getBucketsDetailsEndPoint = config.BaseEndPoint + '/oss/' + config.Version2 + '/buckets/%s/details';

// your code here



module.exports = config;