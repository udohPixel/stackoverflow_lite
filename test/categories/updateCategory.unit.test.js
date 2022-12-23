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
const updateData = require('./updateCategory.data.mock.json');
const Category = require('../../categories/models/Category');
const updateCategoryService = require('../../categories/services/updateCategory.service');

// update category test
describe('UPDATE CATEGORY UNIT TEST', () => {
  const inputData = { ...updateData.bodyData.valid };
  const paramsData = { ...updateData.paramsData.valid };
  const foundData = { ...updateData.foundData.valid };

  const stubData = {
    id: 12,
    title: inputData.title,
    createdAt: '2022-12-11T12:40:46.128Z',
    updatedAt: '2022-12-11T12:40:46.128Z',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should update category information successfully', async () => {
    const stubFindOne = sandbox.stub(Category, 'findOne').resolves(foundData);
    const stubUpdate = sandbox.stub(Category, 'update').resolves();
    const stubFindId = sandbox.stub(Category, 'findByPk').resolves(stubData);

    const response = await updateCategoryService(paramsData.id, inputData.title);

    expect(stubFindOne.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(stubFindId.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('title', stubData.title);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
