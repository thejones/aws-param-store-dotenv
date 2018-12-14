const assert = require('assert');
const includes = require('lodash.includes');

const { getAWSParams, setProcessEnv } = require('./ssm');

const knownEnvironments = ['LOCAL', 'DEV', 'SIT', 'STAGING', 'PRE-PROD', 'PROD'];
module.exports = async (options) => {
  assert(options, 'Options must be an Object');
  assert(options.ssmPath, 'ssmPath must be provided.');
  assert(options.EB_ENV, 'EB_ENV must be provided.');
  const inArray = includes(knownEnvironments, options.EB_ENV);
  assert(inArray, `Value must be one of ${knownEnvironments}`);

  console.log(`Searching Param Store for ${options.ssmPath}`);
  const params = await getAWSParams(options.ssmPath);
  if (params.length) {
    setProcessEnv(params);
  }
};
