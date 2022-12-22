// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const crypto = require('crypto');
const nodeMailer = require('nodemailer');
const PasswordReset = require('../../users/models/PasswordReset');

const sandbox = sinon.createSandbox();

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const passwordForgotData = require('./passwordForgot.data.mock.json');
const token = require('../helpers/helper.auth.token.mock.json');
const User = require('../../users/models/User');
const passwordForgotCtrl = require('../../users/controllers/passwordForgot.controller');
const { stubCreateHash, stubCreateTransport } = require('../helpers/helper.sinon');

// password forgot test
describe('PASSWORD FOTGOT E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...passwordForgotData.bodyData.valid };
    const protocolData = passwordForgotData.protocolData.valid;
    const hostData = passwordForgotData.hostData.valid;
    const foundData = { ...passwordForgotData.foundData.valid };
    const foundDataNone = passwordForgotData.foundData.invalid;

    const stubRandomBytes = token.randomByte;
    const stubResetTokenData = token.resetToken;

    const stubCreateData = {
      id: '3',
      email: 'john.doe123@gmail.com',
      passwordResetToken: '489e6170cfd8a6c2bec415f613881332e8defb201caf3c9cac4fd72801d3e8d224cf1ffc67e56b7d2e1b606d16047c650fe0b2aea2c0284c1dc2a6cf68a5db0c',
      passwordResetExpirationDate: '2022-12-04T11:50:21.898+00:00',
      createdAt: '2022-12-01T11:50:21.123Z',
      updatedAt: '2022-12-01T11:50:21.123Z',
    };

    const link = `${protocolData}://${hostData}/password/reset/${stubResetTokenData}`;
    const stubMailTransportData = {
      email: 'john.doe123@gmail.com',
      subject: 'Stackoverflow-Lite account password reset',
      message: `<div style='background-color: #ffffff; color: #000000'><h2>Please confirm the reset of your password by clicking the button below:</h2></div> <div><a target='_blank'  href='${
        link
      }' data-saferedirecturl='https://www.google.com/url?q=${
        link
      }'>Reset Password</a></div>`,
    };

    let status; let json; let res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      sandbox.restore();
      crypto.createHash.restore();
      nodeMailer.createTransport.restore();
    });

    it('should update password reset token successfully', async () => {
      const req = {
        body: inputData,
        protocol: protocolData,
        hostname: hostData,
      };

      const stubFind = sandbox.stub(User, 'findOne').resolves(foundData);
      const stubToken = sandbox.stub(crypto, 'randomBytes').resolves(stubRandomBytes);
      const stubResetToken = stubCreateHash(stubResetTokenData);
      const stubFindResetToken = sandbox.stub(PasswordReset, 'findOne').resolves(stubCreateData);
      const stubUpdate = sandbox.stub(PasswordReset, 'update').resolves(stubCreateData);
      const stubMailer = stubCreateTransport(stubMailTransportData);

      await passwordForgotCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubToken.calledOnce).to.be.true;
      expect(stubResetToken.calledOnce).to.be.true;
      expect(stubFindResetToken.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(stubMailer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal(`Email sent to ${foundData.email} successfully`);
    });

    it('should create password reset token successfully', async () => {
      const req = {
        body: inputData,
        protocol: protocolData,
        hostname: hostData,
      };

      const stubFind = sandbox.stub(User, 'findOne').resolves(foundData);
      const stubToken = sandbox.stub(crypto, 'randomBytes').resolves(stubRandomBytes);
      const stubResetToken = stubCreateHash(stubResetTokenData);
      const stubFindResetToken = sandbox.stub(PasswordReset, 'findOne').resolves(foundDataNone);
      const stubCreate = sandbox.stub(PasswordReset, 'create').resolves(stubCreateData);
      const stubMailer = stubCreateTransport(stubMailTransportData);

      await passwordForgotCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubToken.calledOnce).to.be.true;
      expect(stubResetToken.calledOnce).to.be.true;
      expect(stubFindResetToken.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(stubMailer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal(`Email sent to ${foundData.email} successfully`);
    });
  });

  describe('NEGATIVE TEST', () => {
    let status; let json; let res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should not create password reset token successfully '
    + 'when user is not found', async () => {
      const inputData = { ...passwordForgotData.bodyData.valid };
      const foundData = passwordForgotData.foundData.invalid;

      const req = {
        body: inputData,
      };

      const stubFind = sandbox.stub(User, 'findOne').resolves(foundData);

      await passwordForgotCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('User does not exist');
    });
  });
});
