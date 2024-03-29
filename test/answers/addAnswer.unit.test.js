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
const addAnswerData = require('./addAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const Question = require('../../questions/models/Question');
const addAnswerService = require('../../answers/services/addAnswer.service');

// add answer unit test
describe('ADD ANSWER UNIT TEST', () => {
  const inputData = { ...addAnswerData.bodyData.valid };
  const userData = { ...addAnswerData.userData.valid };
  const foundDataQuestion = { ...addAnswerData.foundData.validQuestion };

  const stubData = {
    id: 1,
    body: inputData.body,
    QuestionId: inputData.QuestionId,
    UserId: userData.id,
    upVotes: 0,
    downVotes: 0,
    isAcceptedAnswer: false,
    isActive: true,
    createdAt: '2022-11-09T12:40:46.128Z',
    updatedAt: '2022-11-09T12:40:46.128Z',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should create addAnswer successfully', async () => {
    const stubFindQuestion = sandbox.stub(Question, 'findOne').resolves(foundDataQuestion);
    const stubCreate = sandbox.stub(Answer, 'create').resolves(stubData);
    const stubUpdate = sandbox.stub(Question, 'update').resolves();

    const { body, QuestionId } = stubData;

    const response = await addAnswerService(userData.id, body, QuestionId);

    expect(stubFindQuestion.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('body', stubData.body);
    expect(response).to.have.property('QuestionId', stubData.QuestionId);
    expect(response).to.have.property('UserId', stubData.UserId);
    expect(response).to.have.property('upVotes', stubData.upVotes);
    expect(response).to.have.property('downVotes', stubData.downVotes);
    expect(response).to.have.property('isAcceptedAnswer', stubData.isAcceptedAnswer);
    expect(response).to.have.property('isActive', stubData.isActive);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
