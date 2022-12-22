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
const userData = require('./getAllUsers.data.mock.json');
const User = require('../../users/models/User');
const getAllUsersService = require('../../users/services/getAllUsers.service');

// get all user unit test
describe('GET ALL USERS UNIT TEST', () => {
  const queryData = { ...userData.queryData.valid };
  const foundData = { ...userData.foundData.valid };

  afterEach(() => {
    sandbox.restore();
  });

  it('should get all users successfully', async () => {
    const stubFind = sandbox.stub(User, 'findAll').resolves(foundData);

    const response = await getAllUsersService(queryData);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.be.an('object').that.is.not.empty;
  });
});
