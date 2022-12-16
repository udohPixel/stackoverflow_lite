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
const bcrypt = require('bcryptjs');
const updateData = require('./updatePersonalPassword.data.mock.json');
const User = require('../../users/models/User');
const updatePersonalPasswordCtrl = require('../../users/controllers/updatePersonalPassword.controller');

// update personal password test
describe('UPDATE PERSONAL PASSWORD E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...updateData.bodyData.valid };
    const userData = { ...updateData.userData.valid };
    const foundData = { ...updateData.foundData.valid };

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

    it('should update personal password successfully', async () => {
      const req = {
        body: inputData,
        user: userData,
      };

      const stubFindOne = sandbox.stub(User, 'findOne').resolves(foundData);
      const stubUpdate = sandbox.stub(User, 'update').resolves();

      await updatePersonalPasswordCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Password updated successfully');
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

    it('should not update personal password successfully when user is not found', async () => {
      const inputData = { ...updateData.bodyData.invalid };
      const userData = { ...updateData.userData.invalid };
      const foundDataNone = updateData.foundData.invalid;

      const req = {
        body: inputData,
        user: userData,
      };

      const stubFind = sandbox.stub(User, 'findOne').resolves(foundDataNone);

      await updatePersonalPasswordCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('User does not exist');
    });

    it('should not update personal password successfully '
    + 'when user imputted password does not match password in the database', async () => {
      const inputData = { ...updateData.bodyData.invalid };
      const userData = { ...updateData.userData.valid };
      const foundData = { ...updateData.foundData.invalidPassword };

      const req = {
        body: inputData,
        user: userData,
      };

      const stubFind = sandbox.stub(User, 'findOne').resolves(foundData);
      const stubFindPassword = sandbox.stub(bcrypt, 'compare').resolves();

      await updatePersonalPasswordCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubFindPassword.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Invalid password');
    });
  });
});
