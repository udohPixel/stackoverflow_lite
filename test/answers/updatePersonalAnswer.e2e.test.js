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
const answerData = require('./updatePersonalAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const Question = require('../../questions/models/Question');
const updateAnswerCtrl = require('../../answers/controllers/updatePersonalAnswer.controller');

// update answer test
describe('UPDATE PERSONAL ANSWER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...answerData.bodyData.valid };
    const userData = { ...answerData.userData.valid };
    const paramsData = { ...answerData.paramsData.valid };
    const foundData = { ...answerData.foundData.valid };
    const foundDataQuestion = { ...answerData.foundData.validQuestion };

    const stubData = {
      id: paramsData.id,
      body: inputData.body,
      QuestionId: inputData.QuestionId,
      UserId: userData.id,
      upVotes: foundData.upVotes,
      downVotes: foundData.downVotes,
      isAcceptedAnswer: foundData.isAcceptedAnswer,
      isActive: foundData.isActive,
      createdAt: foundData.createdAt,
      updatedAt: '2022-11-10T17:40:00.128Z',
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

    it('should update a answer successfully', async () => {
      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const foundDataSaveAnswer = {
        ...foundData,
        save: sandbox.stub().resolves(stubData),
      };

      const stubFindQuestion = sandbox.stub(Question, 'findOne').resolves(foundDataQuestion);
      const stubFindOne = sandbox.stub(Answer, 'findOne').resolves(foundDataSaveAnswer);

      await updateAnswerCtrl(req, res);

      expect(stubFindQuestion.calledOnce).to.be.true;
      expect(stubFindOne.calledOnce).to.be.true;
      expect(foundDataSaveAnswer.save.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Answer updated successfully');
      expect(json.args[0][0].data).to.equal(stubData);
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

    it('should not update a answer successfully when answer is not found by id', async () => {
      const inputData = { ...answerData.bodyData.valid };
      const userData = { ...answerData.userData.valid };
      const paramsData = { ...answerData.paramsData.invalid };
      const foundDataNone = answerData.foundData.invalid;
      const foundDataQuestion = { ...answerData.foundData.validQuestion };

      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const stubFindQuestion = sandbox.stub(Question, 'findOne').resolves(foundDataQuestion);
      const stubFindOne = sandbox.stub(Answer, 'findOne').resolves(foundDataNone);

      await updateAnswerCtrl(req, res);

      expect(stubFindQuestion.calledOnce).to.be.true;
      expect(stubFindOne.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Answer does not exist');
    });

    it('should not update a answer successfully when logged in user is not creator of the answer', async () => {
      const inputData = { ...answerData.bodyData.valid };
      const userData = { ...answerData.userData.invalid };
      const paramsData = { ...answerData.paramsData.valid };
      const foundData = { ...answerData.foundData.invalidUser };
      const foundDataQuestion = { ...answerData.foundData.validQuestion };

      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const stubFindQuestion = sandbox.stub(Question, 'findOne').resolves(foundDataQuestion);
      const stubFindOne = sandbox.stub(Answer, 'findOne').resolves(foundData);

      await updateAnswerCtrl(req, res);

      expect(stubFindQuestion.calledOnce).to.be.true;
      expect(stubFindOne.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(403);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('You are not allowed to update answer');
    });
  });
});
