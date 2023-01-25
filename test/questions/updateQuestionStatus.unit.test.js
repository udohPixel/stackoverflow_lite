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
const questionData = require('./updateQuestionStatus.data.mock.json');
const Question = require('../../questions/models/Question');
const updateQuestionStatusService = require('../../questions/services/updateQuestionStatus.service');

// update question status test
describe('UPDATE QUESTION STATUS UNIT TEST', () => {
  const paramsData = { ...questionData.paramsData.valid };
  const foundData = { ...questionData.foundData.valid };

  const stubData = {
    id: foundData.id,
    title: foundData.title,
    body: foundData.body,
    CategoryId: foundData.CategoryId,
    UserId: foundData.UserId,
    isActive: false,
    createdAt: foundData.createdAt,
    updatedAt: foundData.updatedAt,
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should update a question active status successfully', async () => {
    const stubFind = sandbox.stub(Question, 'findByPk').resolves(foundData);
    const stubUpdate = sandbox.stub(Question, 'update').resolves();

    const response = await updateQuestionStatusService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(response).to.be.a('object');
    expect(response).to.contain(stubData);
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('title', stubData.title);
    expect(response).to.have.property('body', stubData.body);
    expect(response).to.have.property('CategoryId', stubData.CategoryId);
    expect(response).to.have.property('UserId', stubData.UserId);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
