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
const updateUserStatusService = require('../../users/services/updateUserStatus.service');

// update user status test
describe('CHANGE USER STATE UNIT TEST', () => {
  const paramsData = { ...userData.paramsData.valid };
  const foundData = { ...userData.foundData.valid };

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

  afterEach(() => {
    sandbox.restore();
  });

  it('should update a user active status successfully', async () => {
    const stubFind = sandbox.stub(User, 'findByPk').resolves(foundData);
    const stubUpdate = sandbox.stub(User, 'update').resolves();

    const response = await updateUserStatusService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(response).to.be.an('boolean');
    expect(response).to.equal(stubData.isActive);
  });
});
