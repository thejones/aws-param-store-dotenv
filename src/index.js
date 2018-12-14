const assert = require('assert');

const { getAWSParams, setProcessEnv } = require('./ssm');

module.exports = (options) => {
  assert(options, 'Options must be an Object');
  assert(options.ssmPath, 'ssmPath must be provided.');
  assert(options.region, 'AWS region must be provided.');

  const params = getAWSParams(options.ssmPath, options.region);
  if (params.length) {
    setProcessEnv(params);
  }
};
