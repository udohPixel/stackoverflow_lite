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
const addCategoryData = require('./addCategory.data.mock.json');
const Category = require('../../categories/models/Category');
const addCategoryService = require('../../categories/services/addCategory.service');

// add category unit test
describe('ADD CATEGORY UNIT TEST', () => {
  const inputData = { ...addCategoryData.bodyData.valid };
  const foundDataNone = addCategoryData.foundData.valid;

  const stubData = {
    id: 7,
    title: inputData.title,
    createdAt: '2022-11-09T12:40:46.128Z',
    updatedAt: '2022-11-09T12:40:46.128Z',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should create addCategory successfully', async () => {
    const stubFindOne = sandbox.stub(Category, 'findOne').resolves(foundDataNone);
    const stubCreate = sandbox.stub(Category, 'create').resolves(stubData);

    const { title } = stubData;

    const response = await addCategoryService(title);

    expect(stubFindOne.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('title', stubData.title);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
