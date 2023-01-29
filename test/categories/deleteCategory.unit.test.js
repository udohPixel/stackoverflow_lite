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
const deleteData = require('./deleteCategory.data.mock.json');
const Category = require('../../categories/models/Category');
const deleteCategoryService = require('../../categories/services/deleteCategory.service');

// delete category test
describe('DELETE CATEGORY UNIT TEST', () => {
  const paramsData = { ...deleteData.paramsData.valid };
  const foundData = { ...deleteData.foundData.valid };

  const stubData = {
    id: foundData.id,
    title: foundData.title,
    createdAt: foundData.createdAt,
    updatedAt: foundData.updatedAt,
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should delete category successfully', async () => {
    const stubFind = sandbox.stub(Category, 'findOne').resolves(foundData);
    const stubDelete = sandbox.stub(Category, 'destroy').resolves(stubData);

    const response = await deleteCategoryService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('title', stubData.title);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
