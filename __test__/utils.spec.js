const chai = require('chai');

const { expect } = chai;

const { getAWSParams, setProcessEnv } = require('../src/ssm.js');

describe('Get Params from AWS', () => {
  it('Fetches params from AWS correctly given a path', () => {
    const params = getAWSParams({
      ssmPath: '/nutrien/',
      region: 'us-east-2',
    });
    expect(params).to.be.an('array');
  });

  it('sets process env variables', () => {
    const startLength = Object.keys(process.env).length;
    const mockParams = [
      {
        Name: '/awesome/api/staging/MASTER_KEY',
        Value: 'Beyonce',
      },
      {
        Name: '/bad/api/SECRET_KEY',
        Value: 'A quick brown fox',
      },
    ];
    setProcessEnv(mockParams);
    expect(Object.keys(process.env).length).to.be.above(startLength);
  });

  it('Does not overwrite process env variables', () => {
    const keyString = 'The one true key.';
    process.env.SECOND_MASTER_KEY = keyString;
    const mockParams = [
      {
        Name: '/awesome/api/staging/SECOND_MASTER_KEY',
        Value: 'Jay-Z',
      },
    ];
    setProcessEnv(mockParams);
    expect(process.env.SECOND_MASTER_KEY).to.equal(keyString);
  });
});
