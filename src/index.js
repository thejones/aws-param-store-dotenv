

const assert = require('assert');
const includes = require('lodash.includes');

const { getAWSParams } = require('./ssm');


module.exports = function (options) {
  assert(options.ssmPath, 'ssmPath must be provided.');
  assert(options.EB_ENV, 'EB_ENV must be provided.');
  assert(includes(['LOCAL', 'DEV', 'SIT', 'STAGING', 'PRE-PROD', 'PROD'],
    (options.EB_ENV.toUpperCase())));


  return getAWSParams(options.ssmPath);
};
