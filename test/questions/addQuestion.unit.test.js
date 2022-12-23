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
const addQuestionData = require('./addQuestion.data.mock.json');
const Question = require('../../questions/models/Question');
const addQuestionService = require('../../questions/services/addQuestion.service');

// add question unit test
describe('ADD QUESTION UNIT TEST', () => {
  const inputData = { ...addQuestionData.bodyData.valid };
  const userData = { ...addQuestionData.userData.valid };
  const foundDataNone = addQuestionData.foundData.valid;

  const stubData = {
    id: 1,
    title: inputData.title,
    body: inputData.body,
    CategoryId: inputData.CategoryId,
    UserId: userData.CategoryId,
    createdAt: '2022-11-09T12:40:46.128Z',
    updatedAt: '2022-11-09T12:40:46.128Z',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should create addQuestion successfully', async () => {
    const stubFindOne = sandbox.stub(Question, 'findOne').resolves(foundDataNone);
    const stubCreate = sandbox.stub(Question, 'create').resolves(stubData);

    const { title, body, CategoryId } = stubData;

    const response = await addQuestionService(userData.id, title, body, CategoryId);

    expect(stubFindOne.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('title', stubData.title);
    expect(response).to.have.property('body', stubData.body);
    expect(response).to.have.property('UserId', userData.UserId);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
