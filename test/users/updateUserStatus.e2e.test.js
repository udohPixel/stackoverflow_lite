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
const userData = require('./updateUserStatus.data.mock.json');
const User = require('../../users/models/User');
const updateUserStatusCtrl = require('../../users/controllers/updateUserStatus.controller');

// update user status test
describe('CHANGE USER STATE E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...userData.paramsData.valid };
    const foundData = { ...userData.foundData.valid };

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

    it('should update a user active status successfully', async () => {
      const stubData = {
        id: foundData.id,
        firstname: foundData.firstname,
        lastname: foundData.lastname,
        username: foundData.username,
        email: foundData.email,
        isActive: false,
        createdAt: foundData.createdAt,
        updatedAt: foundData.updatedAt,
      };

      const req = {
        params: paramsData,
      };

      const stubFind = sandbox.stub(User, 'findByPk').resolves(foundData);
      const stubUpdate = sandbox.stub(User, 'update').resolves();

      await updateUserStatusCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('User status updated successfully');
      expect(json.args[0][0].data).to.equal(stubData.isActive);
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

    it('should not update a user active status successfully when user is not found by id', async () => {
      const paramsData = { ...userData.paramsData.invalid };
      const foundDataNone = userData.foundData.invalid;

      const req = {
        params: paramsData,
      };

      const stubFind = sandbox.stub(User, 'findByPk').resolves(foundDataNone);

      await updateUserStatusCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('User does not exist');
    });
  });
});
