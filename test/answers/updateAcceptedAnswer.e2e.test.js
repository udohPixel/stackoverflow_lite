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
const updateAcceptedAnswerCtrl = require('../../answers/controllers/updateAcceptedAnswer.controller');

// update accepted answer test
describe('UPDATE ACCEPTED ANSWER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
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

    let status; let json; let res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should update accepted answer successfully', async () => {
      const req = {
        params: paramsData,
        user: userData,
      };

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

      await updateAcceptedAnswerCtrl(req, res);

      expect(stubFindAcceptedAnswer.calledOnce).to.be.true;
      expect(stubFindQuestion.calledOnce).to.be.true;
      expect(stubFindFormerAcceptedAnswer.calledOnce).to.be.true;
      expect(foundDataSaveAcceptedAnswer.save.calledOnce).to.be.true;
      expect(stubUpdateQuestion.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Accepted answer updated successfully');
      expect(json.args[0][0].data).to.contain(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    let status; let json; let res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should not update accepted answer successfully when answer is not found by id', async () => {
      const paramsData = { ...answerData.paramsData.invalid };
      const userData = { ...answerData.userData.valid };
      const foundDataNone = answerData.foundData.invalid;

      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFindAcceptedAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataNone);

      await updateAcceptedAnswerCtrl(req, res);

      expect(stubFindAcceptedAnswer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Answer does not exist');
    });

    it('should not update accepted answer successfully when logged in user is not creator of the question', async () => {
      const paramsData = { ...answerData.paramsData.valid };
      const userData = { ...answerData.userData.invalid };
      const foundDataAcceptedAnswer = { ...answerData.foundData.validAnswer };
      const foundDataQuestion = { ...answerData.foundData.invalidQuestion };

      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFindAcceptedAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAcceptedAnswer);
      const stubFindQuestion = sandbox.stub(Question, 'findByPk').resolves(foundDataQuestion);

      await updateAcceptedAnswerCtrl(req, res);

      expect(stubFindAcceptedAnswer.calledOnce).to.be.true;
      expect(stubFindQuestion.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(403);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('You are not allowed to update accepted answer');
    });
  });
});
