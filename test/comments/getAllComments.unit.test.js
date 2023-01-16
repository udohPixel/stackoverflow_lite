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
const commentData = require('./getAllComments.data.mock.json');
const Comment = require('../../comments/models/Comment');
const Answer = require('../../answers/models/Answer');
const User = require('../../users/models/User');

const getAllCommentsService = require('../../comments/services/getAllComments.service');

// get all comments unit test
describe('GET ALL COMMENTS UNIT TEST', () => {
  const queryData = { ...commentData.queryData.valid };
  const inputData = { ...commentData.bodyData.valid };
  const foundDataAnswer = { ...commentData.foundData.valid };
  const foundDataUser = { ...commentData.foundData.validUser };

  const stubData = [
    {
      id: 2,
      body: 'This is a sample comment content for a answer. Some more sample content of the comment body to fill up more space goes here. ',
      AnswerId: 2,
      UserId: 1,
      createdAt: '2022-12-26T09:40:02.000Z',
      updatedAt: '2022-12-26T09:40:02.000Z',
    },
    {
      id: 1,
      body: 'This is a sample comment content for my second answer',
      AnswerId: 2,
      UserId: 1,
      createdAt: '2022-12-24T05:10:15.000Z',
      updatedAt: '2022-12-24T05:10:15.000Z',
    },
  ];

  afterEach(() => {
    sandbox.restore();
  });

  it('should get all comments successfully', async () => {
    const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
    const stubFindUser = sandbox.stub(User, 'findOne').resolves(foundDataUser);
    const stubFindComments = sandbox.stub(Comment, 'findAll').resolves(stubData);

    const response = await getAllCommentsService(inputData.answerId, queryData);

    expect(stubFindAnswer.calledOnce).to.be.true;
    expect(stubFindUser.calledOnce).to.be.true;
    expect(stubFindComments.calledOnce).to.be.true;
    expect(response).to.be.an('array');
    expect(response).to.be.an('array').that.is.not.empty;
    expect(response).to.be.equals(stubData);
  });
});
