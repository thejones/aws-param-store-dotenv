const assert = require('assert');
const awsParamStore = require('aws-param-store');

const getAWSParams = (ssmPath) => {
  assert(ssmPath, 'ssmPath must be provided.');

  return awsParamStore
    .getParametersByPath('ssmPath', { region: 'us-east-2' });
};


const parseParams = (inputArray) => {
  inputArray.forEach((ssmItem) => {
    const nameArray = ssmItem.Name.split('/');
    const lastPart = nameArray[nameArray.length - 1];
    process.env[lastPart] = ssmItem.Value;
  });
};

module.exports = {
  getAWSParams,
  parseParams,
};
