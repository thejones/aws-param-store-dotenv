const chai = require('chai');

const { expect } = chai;

const nutrienSSM = require('../src/index');

describe('nutrienSSM', () => {
  it('Requires a search path', async () => {
    try {
      await nutrienSSM();
    } catch (err) {
      expect(err.message).to.equal('Options must be an Object');
    }
  });

  it('Requires an ssmPath', async () => {
    try {
      await nutrienSSM({ EB_ENV: 'DEV' });
    } catch (err) {
      expect(err.message).to.equal('ssmPath must be provided.');
    }
  });

  it('Requires an EB_ENV', async () => {
    try {
      await nutrienSSM({ ssmPath: '/path/' });
    } catch (err) {
      expect(err.message).to.equal('EB_ENV must be provided.');
    }
  });

  it('Requires a correct value for EB_ENV', async () => {
    try {
      await nutrienSSM({
        ssmPath: '/path/',
        EB_ENV: 'bad_value',
      });
    } catch (err) {
      expect(err.message.startsWith('Value must be one of')).to.be.true;
    }
  });

  it('Works as expected', async () => {
    const startLength = Object.keys(process.env).length;
    await await nutrienSSM({
      ssmPath: '/nutrien/',
      EB_ENV: 'DEV',
    });

    expect(Object.keys(process.env).length).to.be.above(startLength);
  });
});
