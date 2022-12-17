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
const userData = require('./deleteUser.data.mock.json');
const User = require('../../users/models/User');
const deleteUserService = require('../../users/services/deleteUser.service');

// delete user test
describe('DELETE USER UNIT TEST', () => {
  const paramsData = { ...userData.paramsData.valid };
  const foundData = { ...userData.foundData.valid };

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

  afterEach(() => {
    sandbox.restore();
  });

  it('should delete a user successfully', async () => {
    const stubFind = sandbox.stub(User, 'findByPk').resolves(foundData);
    const stubDelete = sandbox.stub(User, 'destroy').resolves(stubData);

    const response = await deleteUserService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
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
