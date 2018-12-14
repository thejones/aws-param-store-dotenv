const assert = require('assert');
const awsParamStore = require('aws-param-store');
const has = require('lodash.has');

const getAWSParams = (ssmPath, region) => {
  assert(ssmPath, 'ssmPath must be provided.');
  return awsParamStore
    .getParametersByPathSync(ssmPath, { region });
};


const setProcessEnv = (inputArray) => {
  inputArray.forEach((ssmItem) => {
    const itemsArray = ssmItem.Name.split('/');
    const envName = itemsArray[itemsArray.length - 1];
    if (!has(process.env, envName)) {
      process.env[envName] = ssmItem.Value;
    }
  });
};

module.exports = {
  getAWSParams,
  setProcessEnv,
};
