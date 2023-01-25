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
const updateData = require('./updatePersonalPassword.data.mock.json');
const User = require('../../users/models/User');
const updatePersonalPasswordService = require('../../users/services/updatePersonalPassword.service');

// update personal password test
describe('UPDATE PERSONAL PASSWORD UNIT TEST', () => {
  const inputData = { ...updateData.bodyData.valid };
  const userData = { ...updateData.userData.valid };
  const foundData = { ...updateData.foundData.valid };

  const stubData = {
    id: foundData.id,
    firstname: foundData.firstname,
    lastname: foundData.lastname,
    username: foundData.username,
    email: foundData.email,
    bio: foundData.bio,
    facebook: foundData.facebook,
    youtube: foundData.youtube,
    instagram: foundData.instagram,
    linkedIn: foundData.linkedIn,
    twitter: foundData.twitter,
    isActive: foundData.isActive,
    createdAt: foundData.createdAt,
    updatedAt: foundData.updatedAt,
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should update personal password successfully', async () => {
    const stubFindOne = sandbox.stub(User, 'findOne').resolves(foundData);
    const stubUpdate = sandbox.stub(User, 'update').resolves();

    const { oldPassword, password } = inputData;

    const response = await updatePersonalPasswordService(userData.id, oldPassword, password);

    expect(stubFindOne.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('firstname', stubData.firstname);
    expect(response).to.have.property('lastname', stubData.lastname);
    expect(response).to.have.property('username', stubData.username);
    expect(response).to.have.property('email', stubData.email);
    expect(response).to.have.property('isActive', stubData.isActive);
    expect(response).to.have.property('facebook', stubData.facebook);
    expect(response).to.have.property('youtube', stubData.youtube);
    expect(response).to.have.property('instagram', stubData.instagram);
    expect(response).to.have.property('linkedIn', stubData.linkedIn);
    expect(response).to.have.property('twitter', stubData.twitter);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
