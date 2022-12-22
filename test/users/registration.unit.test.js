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
const registrationService = require('../../users/services/registration.service');

// user registration unit test
describe('REGISTER USER UNIT TEST', () => {
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

  afterEach(() => {
    sandbox.restore();
  });

  it('should create registration successfully', async () => {
    const stubFindOne = sandbox.stub(User, 'findOne').resolves(foundData);
    const stubFindAll = sandbox.stub(User, 'findAll').resolves(foundData);
    const stubCreate = sandbox.stub(User, 'create').resolves(stubData);

    const {
      firstname, lastname, username, email, password,
    } = stubData;

    const response = await registrationService(firstname, lastname, username, email, password);

    expect(stubFindOne.calledOnce).to.be.true;
    expect(stubFindAll.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('firstname', stubData.firstname);
    expect(response).to.have.property('lastname', stubData.lastname);
    expect(response).to.have.property('username', stubData.username);
    expect(response).to.have.property('email', stubData.email);
    expect(response).to.have.property('password', stubData.password);
    expect(response).to.have.property('isActive', stubData.isActive);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
