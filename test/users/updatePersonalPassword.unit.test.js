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
    expect(response).to.be.a('string');
  });
});
