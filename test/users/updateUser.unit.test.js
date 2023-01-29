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
const updateUserService = require('../../users/services/updateUser.service');

// update user test
describe('UPDATE USER UNIT TEST', () => {
  const inputData = { ...updateData.bodyData.valid.userInfo };
  const paramsData = { ...updateData.paramsData.valid };
  const userData = { ...updateData.userData.valid };
  const foundData = { ...updateData.foundData.valid };
  const foundDataNone = updateData.foundData.validNone;

  const stubData = {
    id: 23,
    firstname: inputData.firstname,
    lastname: inputData.lastname,
    username: inputData.username,
    email: inputData.email,
    RoleId: inputData.RoleId,
    facebook: inputData.facebook,
    twitter: inputData.twitter,
    isActive: true,
    createdAt: '2022-11-09T12:40:46.128Z',
    updatedAt: '2022-11-09T12:40:46.128Z',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should update user information successfully', async () => {
    const foundDataUpdateUser = {
      ...foundData,
      save: sandbox.stub().resolves(stubData),
    };

    const stubFindOne = sandbox.stub(User, 'findOne').resolves(foundDataUpdateUser);
    const stubFindAll = sandbox.stub(User, 'findAll').resolves(foundDataNone);

    const userInfo = { ...inputData };

    const response = await updateUserService(paramsData.id, userData.RoleId, userInfo);

    expect(stubFindOne.calledOnce).to.be.true;
    expect(stubFindAll.calledTwice).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('firstname', stubData.firstname);
    expect(response).to.have.property('lastname', stubData.lastname);
    expect(response).to.have.property('username', stubData.username);
    expect(response).to.have.property('email', stubData.email);
    expect(response).to.have.property('RoleId', stubData.RoleId);
    expect(response).to.have.property('isActive', stubData.isActive);
    expect(response).to.have.property('facebook', stubData.facebook);
    expect(response).to.have.property('twitter', stubData.twitter);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
