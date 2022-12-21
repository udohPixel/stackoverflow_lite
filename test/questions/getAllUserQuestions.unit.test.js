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
const questionData = require('./getAllUserQuestions.data.mock.json');
const Question = require('../../questions/models/Question');
const Category = require('../../categories/models/Category');
const User = require('../../users/models/User');
const getAllUserQuestionsService = require('../../questions/services/getAllUserQuestions.service');

// get all user questions unit test
describe('GET ALL USER QUESTIONS UNIT TEST', () => {
  const paramsData = { ...questionData.paramsData.valid };
  const queryData = { ...questionData.queryData.valid };
  const foundDataUser = { ...questionData.foundData.validUser };
  const foundDataCategory = { ...questionData.foundData.validCategory };

  const stubData = [
    {
      id: 3,
      title: 'My third question title',
      body: 'This is a sample question content for my third question',
      CategoryId: 1,
      UserId: 1,
      totalAnswers: null,
      totalVotes: null,
      createdAt: '2022-12-21T13:43:25.000Z',
      updatedAt: '2022-12-21T13:43:25.000Z',
    },
    {
      id: 2,
      title: 'My second question title',
      body: 'This is a sample question content for my second question',
      CategoryId: 1,
      UserId: 1,
      totalAnswers: null,
      totalVotes: null,
      createdAt: '2022-12-21T13:43:06.000Z',
      updatedAt: '2022-12-21T13:43:06.000Z',
    },
  ];

  afterEach(() => {
    sandbox.restore();
  });

  it('should get all user questions successfully', async () => {
    const stubFindUser = sandbox.stub(User, 'findOne').resolves(foundDataUser);
    const stubFindCategory = sandbox.stub(Category, 'findOne').resolves(foundDataCategory);
    const stubFindQuestions = sandbox.stub(Question, 'findAll').resolves(stubData);

    const response = await getAllUserQuestionsService(paramsData.username, queryData);

    expect(stubFindUser.calledOnce).to.be.true;
    expect(stubFindCategory.calledOnce).to.be.true;
    expect(stubFindQuestions.calledOnce).to.be.true;
    expect(response).to.be.an('array');
    expect(response).to.be.an('array').that.is.not.empty;
    expect(response).to.be.equals(stubData);
  });
});
