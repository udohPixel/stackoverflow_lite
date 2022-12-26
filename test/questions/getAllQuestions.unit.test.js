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
const questionData = require('./getAllQuestions.data.mock.json');
const Question = require('../../questions/models/Question');
const Category = require('../../categories/models/Category');
const getAllQuestionsService = require('../../questions/services/getAllQuestions.service');

// get all questions unit test
describe('GET ALL QUESTIONS UNIT TEST', () => {
  const queryData = { ...questionData.queryData.valid };
  const foundDataCategory = { ...questionData.foundData.validCategory };

  const stubData = [
    {
      id: 3,
      title: 'My third question title',
      body: 'This is a sample question content for my third question',
      CategoryId: 1,
      UserId: 1,
      totalAnswers: 0,
      createdAt: '2022-12-21T13:43:25.000Z',
      updatedAt: '2022-12-21T13:43:25.000Z',
    },
    {
      id: 2,
      title: 'My second question title',
      body: 'This is a sample question content for my second question',
      CategoryId: 1,
      UserId: 1,
      totalAnswers: 0,
      createdAt: '2022-12-21T13:43:06.000Z',
      updatedAt: '2022-12-21T13:43:06.000Z',
    },
  ];

  afterEach(() => {
    sandbox.restore();
  });

  it('should get all questions successfully', async () => {
    const stubFindCategory = sandbox.stub(Category, 'findOne').resolves(foundDataCategory);
    const stubFindQuestions = sandbox.stub(Question, 'findAll').resolves(stubData);

    const response = await getAllQuestionsService(queryData);

    expect(stubFindCategory.calledOnce).to.be.true;
    expect(stubFindQuestions.calledOnce).to.be.true;
    expect(response).to.be.an('array');
    expect(response).to.be.an('array').that.is.not.empty;
    expect(response).to.be.equals(stubData);
  });
});
