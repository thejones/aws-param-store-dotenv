const chai = require('chai');

const { expect } = chai;

const awsParamStoreEnv = require('../src/index');

describe('awsParamStoreEnv', () => {
  it('Requires a search path', () => {
    try {
      awsParamStoreEnv();
    } catch (err) {
      expect(err.message).to.equal('Options must be an Object');
    }
  });

  it('Requires an ssmPath', () => {
    try {
      awsParamStoreEnv({ region: 'region' });
    } catch (err) {
      expect(err.message).to.equal('ssmPath must be provided.');
    }
  });

  it('Requires an AWS region', () => {
    try {
      awsParamStoreEnv({ ssmPath: '/path/' });
    } catch (err) {
      expect(err.message).to.equal('AWS region must be provided.');
    }
  });

  it('Works as expected', () => {
    const startLength = Object.keys(process.env).length;
    awsParamStoreEnv({
      ssmPath: '/Provide a Valid Path Here/',
      region: 'us-east-2',
    });

    expect(Object.keys(process.env).length).to.be.above(startLength);
  });
});
