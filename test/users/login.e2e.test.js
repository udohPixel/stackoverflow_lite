// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const sandbox = sinon.createSandbox();

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const bcrypt = require('bcryptjs');
const loginData = require('./login.data.mock.json');
const token = require('../helpers/helper.auth.token.mock.json');
const User = require('../../users/models/User');
const loginCtrl = require('../../users/controllers/login.controller');

// login user test
describe('LOGIN E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...loginData.bodyData.valid };
    const foundData = loginData.foundData.valid;

    const stubData = token.token;

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

    it('should create a situation successfully', async () => {
      const req = {
        body: inputData,
      };

      const stubFind = sandbox.stub(User, 'findOne').resolves(foundData);
      const stubSign = sandbox.stub(jwt, 'sign').resolves(stubData);

      await loginCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubSign.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('You logged in successfully');
      expect(json.args[0][0].data).to.equal(`Bearer ${stubData}`);
    });
  });

  describe('NEGATIVE TEST', () => {
    const inputData = { ...loginData.bodyData.invalid };
    const foundDataEmail = { ...loginData.foundData.invalidEmail };
    const foundDataPassword = { ...loginData.foundData.invalidPassword };

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

    it('should not login successfully when user imputted email '
    + 'does not match any email in the database', async () => {
      const req = {
        body: inputData,
      };

      const stubFindEmail = sandbox.stub(User, 'findOne').resolves(foundDataEmail);

      await loginCtrl(req, res);

      expect(stubFindEmail.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Invalid email or password');
    });

    it('should not login successfully when user imputted password '
    + 'does not match password in the database', async () => {
      const req = {
        body: inputData,
      };

      const stubFindEmail = sandbox.stub(User, 'findOne').resolves(foundDataPassword);
      const stubFindPassword = sandbox.stub(bcrypt, 'compare').resolves();

      await loginCtrl(req, res);

      expect(stubFindEmail.calledOnce).to.be.true;
      expect(stubFindPassword.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Invalid email or password');
    });
  });
});
