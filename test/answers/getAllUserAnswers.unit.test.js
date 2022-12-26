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
const questionData = require('./getAllUserAnswers.data.mock.json');
const Answer = require('../../answers/models/Answer');
const User = require('../../users/models/User');
const getAllUserAnswersService = require('../../answers/services/getAllUserAnswers.service');

// get all user answers unit test
describe('GET ALL USER ANSWERS UNIT TEST', () => {
  const paramsData = { ...questionData.paramsData.valid };
  const queryData = { ...questionData.queryData.valid };
  const foundDataUser = { ...questionData.foundData.validUser };

  const stubData = [
    {
      id: 2,
      body: 'This is a sample answer content for a question. Some more sample content of the answer body to fill up more space goes here. ',
      QuestionId: 2,
      UserId: 1,
      totalVotes: 0,
      isAcceptedAnswer: false,
      isActive: true,
      createdAt: '2022-12-26T09:40:02.000Z',
      updatedAt: '2022-12-26T09:40:02.000Z',
    },
    {
      id: 1,
      body: 'This is a sample answer content for my second question',
      QuestionId: 2,
      UserId: 1,
      totalVotes: 0,
      isAcceptedAnswer: false,
      isActive: true,
      createdAt: '2022-12-24T05:10:15.000Z',
      updatedAt: '2022-12-24T05:10:15.000Z',
    },
  ];

  afterEach(() => {
    sandbox.restore();
  });

  it('should get all user answers successfully', async () => {
    const stubFindUser = sandbox.stub(User, 'findOne').resolves(foundDataUser);
    const stubFindAnswers = sandbox.stub(Answer, 'findAll').resolves(stubData);

    const response = await getAllUserAnswersService(paramsData.username, queryData);

    expect(stubFindUser.calledOnce).to.be.true;
    expect(stubFindAnswers.calledOnce).to.be.true;
    expect(response).to.be.an('array');
    expect(response).to.be.an('array').that.is.not.empty;
    expect(response).to.be.equals(stubData);
  });
});
