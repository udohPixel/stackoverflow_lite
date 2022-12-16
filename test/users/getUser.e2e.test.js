/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const userData = require('./getUser.data.mock.json');
const User = require('../../users/models/User');
const getUserCtrl = require('../../users/controllers/getUser.controller');

// get user test
describe('GET USER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...userData.paramsData.valid };
    const foundData = { ...userData.foundData.valid };

    let status; let json; let
      res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should get user successfully', async () => {
      const req = {
        params: paramsData,
      };

      const stubFind = sandbox.stub(User, 'findOne').resolves(foundData);

      await getUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('User found successfully');
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const paramsData = { ...userData.paramsData.invalid };
    const foundDataNone = userData.foundData.invalid;

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

    it('should not get user successfully', async () => {
      const req = {
        params: paramsData,
      };

      const stubFindNone = sandbox.stub(User, 'findOne').resolves(foundDataNone);

      await getUserCtrl(req, res);

      expect(stubFindNone.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('User does not exist');
    });
  });
});
