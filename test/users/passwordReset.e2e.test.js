/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const nodeMailer = require('nodemailer');

const sandbox = sinon.createSandbox();

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const passwordResetData = require('./passwordReset.data.mock.json');
const PasswordReset = require('../../users/models/PasswordReset');
const User = require('../../users/models/User');
const passwordResetCtrl = require('../../users/controllers/passwordReset.controller');
const {
  stubCreateTransport,
} = require('../helpers/helper.sinon');

// password reset user test
describe('PASSWORD RESET E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...passwordResetData.bodyData.valid };
    const paramsData = passwordResetData.paramsData.valid;
    const foundResetTokenData = { ...passwordResetData.foundData.valid };
    const foundUserData = { ...passwordResetData.foundData.valid1 };

    const stubUpdateData = {
      id: foundUserData.id,
      firstname: foundUserData.firstname,
      lastname: foundUserData.lastname,
      username: foundUserData.username,
      password: inputData.password,
      isActive: foundUserData.isActive,
      createdAt: foundUserData.createdAt,
      updatedAt: foundUserData.updatedAt,
    };

    const stubMailTransportData = {
      email: 'john.doe123@gmail.com',
      subject: 'Stackoverflow-Lite account password reset',
      message: `<div><h2>Your password was changed successfully.</h2><p>Your new password is ${
        inputData.password
      }</p></div>`,
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
    });

    after(() => {
      nodeMailer.createTransport.restore();
    });

    it('should create password reset token successfully', async () => {
      const req = {
        body: inputData,
        params: paramsData,
      };

      const stubResetToken = sandbox.stub(PasswordReset, 'findOne').resolves(foundResetTokenData);
      const stubFindUser = sandbox.stub(User, 'findOne').resolves(foundUserData);
      const stubUpdate = sandbox.stub(User, 'update').resolves(stubUpdateData);
      const stubMailer = stubCreateTransport(stubMailTransportData);

      await passwordResetCtrl(req, res);

      expect(stubResetToken.calledOnce).to.be.true;
      expect(stubFindUser.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(stubMailer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Password was reset successfully');
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

    it('should not create password reset token successfully when token is not found', async () => {
      const inputData = { ...passwordResetData.bodyData.valid };
      const paramsData = { ...passwordResetData.paramsData.invalid };
      const foundResetTokenData = passwordResetData.foundData.invalid;

      const req = {
        body: inputData,
        params: paramsData,
      };

      const stubFind = sandbox.stub(PasswordReset, 'findOne').resolves(foundResetTokenData);

      await passwordResetCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Password reset link is invalid or has expired');
    });

    it('should not create password reset token successfully when user is not found', async () => {
      const inputData = { ...passwordResetData.bodyData.valid };
      const paramsData = { ...passwordResetData.paramsData.valid };
      const foundResetTokenData = { ...passwordResetData.foundData.valid };
      const foundUserDataNone = passwordResetData.foundData.invalid;

      const req = {
        body: inputData,
        params: paramsData,
      };

      const stubResetToken = sandbox.stub(PasswordReset, 'findOne').resolves(foundResetTokenData);
      const stubFind = sandbox.stub(User, 'findOne').resolves(foundUserDataNone);

      await passwordResetCtrl(req, res);

      expect(stubResetToken.calledOnce).to.be.true;
      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('User does not exist');
    });
  });
});
