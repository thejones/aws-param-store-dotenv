const chai = require('chai');

const { expect } = chai;

const { getAWSParams, setProcessEnv } = require('../src/ssm.js');

describe('Get Params from AWS', () => {
  let params;
  before(async () => {
    // runs before all tests in this block
    params = await getAWSParams('/nutrien/');
  });


  it('Fetches params from AWS correctly given a path', async () => {
    expect(params).to.not.be.empty;
  });

  it('sets process env variables', async () => {
    const startLength = Object.keys(process.env).length;
    setProcessEnv(params);
    expect(Object.keys(process.env).length).to.be.above(startLength);
  });
});
