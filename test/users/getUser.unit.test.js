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
const userData = require('./getUser.data.mock.json');
const User = require('../../users/models/User');
const getUserService = require('../../users/services/getUser.service');

// get user test
describe('GET USER UNIT TEST', () => {
  const paramsData = { ...userData.paramsData.valid };
  const foundData = { ...userData.foundData.valid };

  afterEach(() => {
    sandbox.restore();
  });

  it('should get user successfully', async () => {
    const stubFind = sandbox.stub(User, 'findOne').resolves(foundData);

    const response = await getUserService(paramsData.username);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', foundData.id);
    expect(response).to.have.property('firstname', foundData.firstname);
    expect(response).to.have.property('lastname', foundData.lastname);
    expect(response).to.have.property('username', foundData.username);
    expect(response).to.have.property('email', foundData.email);
    expect(response).to.have.property('isActive', foundData.isActive);
    expect(response).to.have.property('createdAt', foundData.createdAt);
    expect(response).to.have.property('updatedAt', foundData.updatedAt);
  });
});
