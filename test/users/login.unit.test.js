/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const sandbox = sinon.createSandbox();

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const loginData = require('./login.data.mock.json');
const token = require('../helpers/helper.auth.token.mock.json');
const User = require('../../users/models/User');
const loginService = require('../../users/services/login.service');

// login user test
describe('LOGIN UNIT TEST', () => {
  const inputData = { ...loginData.bodyData.valid };
  const foundData = { ...loginData.foundData.valid };

  const stubData = token.token;

  afterEach(() => {
    sandbox.restore();
  });

  it('should log in user successfully', async () => {
    const stubFind = sandbox.stub(User, 'findOne').resolves(foundData);
    const stubSign = sandbox.stub(jwt, 'sign').resolves(stubData);

    const response = await loginService(inputData.email, inputData.password);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubSign.calledOnce).to.be.true;
    expect(response).to.be.a('string');
    expect(response).to.equal(stubData);
  });
});
