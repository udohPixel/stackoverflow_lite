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
const categoryData = require('./getAllCategories.data.mock.json');
const Category = require('../../categories/models/Category');
const getAllCategoriesService = require('../../categories/services/getAllCategories.service');

// get all category unit test
describe('GET ALL CATEGORIES UNIT TEST', () => {
  const foundData = { ...categoryData.foundData.valid };

  afterEach(() => {
    sandbox.restore();
  });

  it('should get all categories successfully', async () => {
    const stubFind = sandbox.stub(Category, 'findAll').resolves(foundData);

    const response = await getAllCategoriesService();

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.be.an('object').that.is.not.empty;
  });
});
