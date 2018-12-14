const chai = require('chai');

const { expect } = chai;

const { getAWSParams, parseParams } = require('../src/ssm.js');

describe('Get Params from AWS', () => {
  let params;
  it('status', async () => {
    params = await getAWSParams('/nutrien/');
    expect(params).to.not.be.empty;
  });

  it('sets process env variables', async () => {
    const startLength = Object.keys(process.env).length;
    parseParams(params);

    expect(Object.keys(process.env).length).to.be.above(startLength);
  });
});
