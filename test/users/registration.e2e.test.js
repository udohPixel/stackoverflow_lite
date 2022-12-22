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
const registrationData = require('./registration.data.mock.json');
const User = require('../../users/models/User');
const registrationCtrl = require('../../users/controllers/registration.controller');

// user registration e2e test
describe('REGISTER USER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...registrationData.bodyData.valid };
    const foundData = registrationData.foundData.valid;

    const stubData = {
      id: '7',
      firstname: inputData.firstname,
      lastname: inputData.lastname,
      username: inputData.username,
      email: inputData.email,
      password: inputData.password,
      isActive: true,
      createdAt: '2022-11-09T12:40:46.128Z',
      updatedAt: '2022-11-09T12:40:46.128Z',
    };

    let status; let json; let
      res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    after(() => {
      sandbox.restore();
    });

    it('should register user successfully', async () => {
      const req = {
        body: inputData,
      };

      const stubFindOne = sandbox.stub(User, 'findOne').resolves(foundData);
      const stubFindAll = sandbox.stub(User, 'findAll').resolves(foundData);
      const stubCreate = sandbox.stub(User, 'create').resolves(stubData);

      await registrationCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(stubFindAll.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Registration successful');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const inputData = { ...registrationData.bodyData.valid };
    const foundDataEmail = { ...registrationData.foundData.invalidEmail };
    const foundDataNone = registrationData.foundData.valid;
    const foundDataUsername = { ...registrationData.foundData.invalidUsername };

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

    it('should not register user successfully when user is found with same email', async () => {
      const req = {
        body: inputData,
      };

      const stubFindEmail = sandbox.stub(User, 'findOne').resolves(foundDataEmail);

      await registrationCtrl(req, res);

      expect(stubFindEmail.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Email has already been taken. Try another');
    });

    it('should not register user successfully when user is found with same username', async () => {
      const req = {
        body: inputData,
      };

      const stubFindNone = sandbox.stub(User, 'findOne').resolves(foundDataNone);
      const stubFindUsername = sandbox.stub(User, 'findAll').resolves(foundDataUsername);

      await registrationCtrl(req, res);

      expect(stubFindNone.calledOnce).to.be.true;
      expect(stubFindUsername.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Username has already been taken. Try another');
    });
  });
});
