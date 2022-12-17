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
const updateData = require('./updateUser.data.mock.json');
const User = require('../../users/models/User');
const updateUserCtrl = require('../../users/controllers/updateUser.controller');

// update user test
describe('UPDATE USER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...updateData.bodyData.valid.userInfo };
    const paramsData = { ...updateData.paramsData.valid };
    const userData = { ...updateData.userData.valid };
    const foundData = { ...updateData.foundData.valid };
    const foundDataNone = updateData.foundData.validNone;

    const stubData = {
      id: '23',
      firstname: inputData.firstname,
      lastname: inputData.lastname,
      username: inputData.username,
      email: inputData.email,
      facebook: inputData.facebook,
      twitter: inputData.twitter,
      isActive: true,
      createdAt: '2022-11-09T12:40:46.128Z',
      updatedAt: '2022-11-09T12:40:46.128Z',
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

    it('should update a user successfully', async () => {
      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const stubFindOne = sandbox.stub(User, 'findOne').resolves(foundData);
      const stubFindAll = sandbox.stub(User, 'findAll').resolves(foundDataNone);
      const stubUpdate = sandbox.stub(User, 'update').resolves();
      const stubFindId = sandbox.stub(User, 'findByPk').resolves(stubData);

      await updateUserCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(stubFindAll.calledTwice).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(stubFindId.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('User updated successfully');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const inputData = { ...updateData.bodyData.valid.userInfo };
    const userData = { ...updateData.userData.valid };
    const paramsDataInvalid = { ...updateData.paramsData.invalid };
    const paramsDataValid = { ...updateData.paramsData.valid };
    const foundDataNone = updateData.foundData.validNone;
    const foundDataOne = { ...updateData.foundData.valid };
    const foundDataEmail = { ...updateData.foundData.invalidEmail };

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

    it('should not update a user successfully when user is not found', async () => {
      const req = {
        body: inputData,
        user: userData,
        params: paramsDataInvalid,
      };

      const stubFindOneUser = sandbox.stub(User, 'findOne').resolves(foundDataNone);

      await updateUserCtrl(req, res);

      expect(stubFindOneUser.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('User does not exist');
    });

    it('should not update a user successfully when user is found with same email', async () => {
      const req = {
        body: inputData,
        user: userData,
        params: paramsDataValid,
      };

      const stubFindOneUser = sandbox.stub(User, 'findOne').resolves(foundDataOne);
      const stubFindEmail = sandbox.stub(User, 'findAll').resolves(foundDataEmail);

      await updateUserCtrl(req, res);

      expect(stubFindOneUser.calledOnce).to.be.true;
      expect(stubFindEmail.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(409);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Email has already been taken. Try another');
    });
  });
});
