const chai = require('chai');

const { expect } = chai;

const nutrienSSM = require('../src/index');

describe('nutrienSSM', () => {
  it('Requires a search path', () => {
    try {
      nutrienSSM();
    } catch (err) {
      expect(err.message).to.equal('Options must be an Object');
    }
  });

  it('Requires an ssmPath', () => {
    try {
      nutrienSSM({ region: 'region' });
    } catch (err) {
      expect(err.message).to.equal('ssmPath must be provided.');
    }
  });

  it('Requires an AWS region', () => {
    try {
      nutrienSSM({ ssmPath: '/path/' });
    } catch (err) {
      expect(err.message).to.equal('AWS region must be provided.');
    }
  });

  it('Works as expected', () => {
    const startLength = Object.keys(process.env).length;
    nutrienSSM({
      ssmPath: '/nutrien/',
      region: 'us-east-2',
    });

    expect(Object.keys(process.env).length).to.be.above(startLength);
  });
});
