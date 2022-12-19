/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const nodeMailer = require('nodemailer');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const passwordResetData = require('./passwordReset.data.mock.json');
const PasswordReset = require('../../users/models/PasswordReset');
const User = require('../../users/models/User');
const passwordResetService = require('../../users/services/passwordReset.service');
const {
  stubCreateTransport,
} = require('../helpers/helper.sinon');

// password reset user test
describe('PASSWORD RESET UNIT TEST', () => {
  const inputData = { ...passwordResetData.bodyData.valid };
  const paramsData = { ...passwordResetData.paramsData.valid };
  const foundResetTokenData = { ...passwordResetData.foundData.valid };
  const foundUserData = { ...passwordResetData.foundData.valid1 };

  const stubUpdateData = {
    id: foundUserData.id,
    firstname: foundUserData.firstname,
    lastname: foundUserData.lastname,
    username: foundUserData.username,
    email: foundUserData.email,
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

  afterEach(() => {
    sandbox.restore();
  });

  after(() => {
    nodeMailer.createTransport.restore();
  });

  it('should create password reset token successfully', async () => {
    const stubResetToken = sandbox.stub(PasswordReset, 'findOne').resolves(foundResetTokenData);
    const stubFindUser = sandbox.stub(User, 'findOne').resolves(foundUserData);
    const stubUpdate = sandbox.stub(User, 'update').resolves(stubUpdateData);
    const stubMailer = stubCreateTransport(stubMailTransportData);

    const response = await passwordResetService(paramsData.token, inputData.password);

    expect(stubResetToken.calledOnce).to.be.true;
    expect(stubFindUser.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(stubMailer.calledOnce).to.be.true;
    expect(response).to.be.a('string');
  });
});
