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
  const foundDataAcceptedAnswer2 = { ...answerData.foundData.validAnswer2 };

  const stubData = {
    id: foundDataAcceptedAnswer.id,
    body: foundDataAcceptedAnswer.body,
    QuestionId: foundDataAcceptedAnswer.QuestionId,
    UserId: foundDataAcceptedAnswer.UserId,
    upVotes: foundDataAcceptedAnswer.upVotes,
    downVotes: foundDataAcceptedAnswer.downVotes,
    isAcceptedAnswer: true,
    isActive: foundDataAcceptedAnswer.isActive,
    createdAt: foundDataAcceptedAnswer.createdAt,
    updatedAt: foundDataAcceptedAnswer.updatedAt,
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should update accepted answer successfully', async () => {
    const foundDataSaveAcceptedAnswer = {
      ...foundDataAcceptedAnswer,
      save: sandbox.stub().resolves(foundDataAcceptedAnswer2),
    };
    const foundDataSaveFormerAcceptedAnswer = {
      ...foundDataAcceptedAnswer2,
      save: sandbox.stub().resolves(foundDataAcceptedAnswer),
    };

    const stubFindAcceptedAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataSaveAcceptedAnswer);
    const stubFindQuestion = sandbox.stub(Question, 'findByPk').resolves(foundDataQuestion);
    const stubFindFormerAcceptedAnswer = sandbox.stub(Answer, 'findOne').resolves(foundDataSaveFormerAcceptedAnswer);
    const stubUpdateQuestion = sandbox.stub(Question, 'update').resolves();

    const response = await updateAcceptedAnswerService(userData.id, paramsData.id);

    expect(stubFindAcceptedAnswer.calledOnce).to.be.true;
    expect(stubFindQuestion.calledOnce).to.be.true;
    expect(stubFindFormerAcceptedAnswer.calledOnce).to.be.true;
    expect(foundDataSaveAcceptedAnswer.save.calledOnce).to.be.true;
    expect(stubUpdateQuestion.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.contain(stubData);
  });
});
