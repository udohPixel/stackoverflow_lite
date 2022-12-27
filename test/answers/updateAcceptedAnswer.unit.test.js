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
const answerData = require('./updateAcceptedAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const Question = require('../../questions/models/Question');
const updateAcceptedAnswerService = require('../../answers/services/updateAcceptedAnswer.service');

// update accepted answer test
describe('UPDATE ACCEPTED ANSWER UNIT TEST', () => {
  const paramsData = { ...answerData.paramsData.valid };
  const userData = { ...answerData.userData.valid };
  const foundDataAcceptedAnswer = { ...answerData.foundData.validAnswer };
  const foundDataQuestion = { ...answerData.foundData.validQuestion };
  const foundDataFormerAcceptedAnswer = { ...answerData.foundData.validFormerAcceptedAnswer };

  const stubData = [
    {
      id: foundDataAcceptedAnswer.id,
      body: foundDataAcceptedAnswer.body,
      QuestionId: foundDataAcceptedAnswer.QuestionId,
      UserId: foundDataAcceptedAnswer.UserId,
      totalVotes: foundDataAcceptedAnswer.totalVotes,
      isAcceptedAnswer: true,
      isActive: foundDataAcceptedAnswer.isActive,
      createdAt: foundDataAcceptedAnswer.createdAt,
      updatedAt: foundDataAcceptedAnswer.updatedAt,
    },
  ];

  afterEach(() => {
    sandbox.restore();
  });

  it('should update accepted answer successfully', async () => {
    const stubFindAcceptedAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAcceptedAnswer);
    const stubFindQuestion = sandbox.stub(Question, 'findByPk').resolves(foundDataQuestion);
    const stubFindFormerAcceptedAnswer = sandbox.stub(Answer, 'findOne').resolves(foundDataFormerAcceptedAnswer);
    const stubUpdate = sandbox.stub(Answer, 'update').resolves();
    const stubReturnAcceptedAnswer = sandbox.stub(Answer, 'findAll').resolves(stubData);

    const response = await updateAcceptedAnswerService(userData.id, paramsData.id);

    expect(stubFindAcceptedAnswer.calledOnce).to.be.true;
    expect(stubFindQuestion.calledOnce).to.be.true;
    expect(stubFindFormerAcceptedAnswer.calledOnce).to.be.true;
    expect(stubUpdate.calledTwice).to.be.true;
    expect(stubReturnAcceptedAnswer.calledOnce).to.be.true;
    expect(response).to.be.a('boolean');
    expect(response).to.equal(stubData[0].isAcceptedAnswer);
  });
});
