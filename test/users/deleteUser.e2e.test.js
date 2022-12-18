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
const deleteData = require('./deleteUser.data.mock.json');
const User = require('../../users/models/User');
const deleteUserCtrl = require('../../users/controllers/deleteUser.controller');

// delete user test
describe('DELETE USER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...deleteData.paramsData.valid };
    const userData = { ...deleteData.userData.valid };
    const foundData = { ...deleteData.foundData.valid };

    const stubData = {
      id: foundData.id,
      firstname: foundData.firstname,
      lastname: foundData.lastname,
      username: foundData.username,
      email: foundData.email,
      password: foundData.password,
      isActive: foundData.isActive,
      createdAt: foundData.createdAt,
      updatedAt: foundData.updatedAt,
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

    it('should delete a user successfully', async () => {
      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFind = sandbox.stub(User, 'findOne').resolves(foundData);
      const stubDelete = sandbox.stub(User, 'destroy').resolves(stubData);

      await deleteUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('User deleted successfully');
    });
  });

  describe('NEGATIVE TEST', () => {
    const paramsData = { ...deleteData.paramsData.invalid };
    const userData = { ...deleteData.userData.valid };
    const foundDataNone = deleteData.foundData.invalid;

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

    it('should not delete a user successfully when user is not found by id', async () => {
      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFind = sandbox.stub(User, 'findOne').resolves(foundDataNone);

      await deleteUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('User does not exist');
    });
  });
});
