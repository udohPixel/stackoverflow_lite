/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
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
      User.findOne.restore();
      jwt.sign.restore();
    });

    it('should create a situation successfully', async () => {
      const req = {
        body: inputData,
      };

      const stubFind = sinon.stub(User, 'findOne').resolves(foundData);
      const stubSign = sinon.stub(jwt, 'sign').resolves(stubData);

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
    const foundData1 = { ...loginData.foundData.invalid1 };
    const foundData2 = { ...loginData.foundData.invalid2 };

    let status; let json; let
      res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.findOne.restore();
    });

    it('should not login successfully when user imputted '
    + 'email does not match any email in the database', async () => {
      const req = {
        body: inputData,
      };

      const stubFind = sinon.stub(User, 'findOne').resolves(foundData1);

      await loginCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Invalid email or password');
    });

    it('should not login successfully when user imputted '
    + 'password does not match password in the database', async () => {
      const req = {
        body: inputData,
      };

      const stubFind = sinon.stub(User, 'findOne').resolves(foundData2);

      await loginCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Invalid email or password');
    });
  });
});
