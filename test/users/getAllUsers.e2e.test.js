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
const userData = require('./getAllUsers.data.mock.json');
const User = require('../../users/models/User');
const getAllUsersCtrl = require('../../users/controllers/getAllUsers.controller');

// get all users test
describe('GET ALL USERS E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const queryData = { ...userData.queryData.valid };
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

    it('should get all users successfully', async () => {
      const req = {
        query: queryData,
      };

      const stubFind = sandbox.stub(User, 'findAll').resolves(foundData);

      await getAllUsersCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Users found successfully');
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });
});
