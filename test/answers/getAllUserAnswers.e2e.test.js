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
const answerData = require('./getAllUserAnswers.data.mock.json');
const Answer = require('../../answers/models/Answer');
const User = require('../../users/models/User');
const getAllUserAnswersCtrl = require('../../answers/controllers/getAllUserAnswers.controller');

// get all user answers test
describe('GET ALL USER ANSWERS E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...answerData.paramsData.valid };
    const queryData = { ...answerData.queryData.valid };
    const foundDataUser = { ...answerData.foundData.validUser };

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

    it('should get all user answers successfully', async () => {
      const req = {
        params: paramsData,
        query: queryData,
      };

      const stubFindUser = sandbox.stub(User, 'findOne').resolves(foundDataUser);
      const stubFindAnswers = sandbox.stub(Answer, 'findAll').resolves(stubData);

      await getAllUserAnswersCtrl(req, res);

      expect(stubFindUser.calledOnce).to.be.true;
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

    it('should not get all user answers successfully when user is not found', async () => {
      const paramsData = { ...answerData.paramsData.invalid };
      const foundDataUser = answerData.foundData.invalid;

      const req = {
        params: paramsData,
      };

      const stubFindUser = sandbox.stub(User, 'findOne').resolves(foundDataUser);

      await getAllUserAnswersCtrl(req, res);

      expect(stubFindUser.calledOnce).to.be.true;
      const stubFindUserCallArg = stubFindUser.getCalls()[0].args[0];
      expect(stubFindUserCallArg).to.be.an('object');
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('User does not exist');
    });
  });
});
