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
const answerData = require('./getAllAnswers.data.mock.json');
const Answer = require('../../answers/models/Answer');
const Question = require('../../questions/models/Question');
const getAllAnswersCtrl = require('../../answers/controllers/getAllAnswers.controller');

// get all answers test
describe('GET ALL ANSWERS E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const queryData = { ...answerData.queryData.valid };
    const paramsData = { ...answerData.paramsData.valid };
    const foundDataQuestion = { ...answerData.foundData.valid };

    const stubData = [
      {
        id: 2,
        body: 'This is a sample answer content for a question. Some more sample content of the answer body to fill up more space goes here. ',
        QuestionId: 2,
        UserId: 1,
        upVotes: 0,
        downVotes: 0,
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
        upVotes: 0,
        downVotes: 0,
        isAcceptedAnswer: false,
        isActive: true,
        createdAt: '2022-12-24T05:10:15.000Z',
        updatedAt: '2022-12-24T05:10:15.000Z',
      },
    ];

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

    it('should get all answers successfully', async () => {
      const req = {
        query: queryData,
        params: paramsData,
      };

      const stubFindQuestion = sandbox.stub(Question, 'findByPk').resolves(foundDataQuestion);
      const stubFindAnswers = sandbox.stub(Answer, 'findAll').resolves(stubData);

      await getAllAnswersCtrl(req, res);

      expect(stubFindQuestion.calledOnce).to.be.true;
      expect(stubFindAnswers.calledOnce).to.be.true;
      const stubFindAnswersCallArg = stubFindAnswers.getCalls()[0].args[0];
      expect(stubFindAnswersCallArg).to.be.an('object');
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Answers found successfully');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const paramsData = { ...answerData.paramsData.invalid };
    const foundDataQuestionNone = answerData.foundData.invalid;

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

    it('should not get all answers successfully when question is not found', async () => {
      const req = {
        params: paramsData,
      };

      const stubFindQuestion = sandbox.stub(Question, 'findByPk').resolves(foundDataQuestionNone);

      await getAllAnswersCtrl(req, res);

      expect(stubFindQuestion.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Question does not exist');
    });
  });
});
