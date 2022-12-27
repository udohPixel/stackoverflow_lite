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
const addAnswerCtrl = require('../../answers/controllers/addAnswer.controller');

// add answer e2e test
describe('ADD ANSWER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...addAnswerData.bodyData.valid };
    const userData = { ...addAnswerData.userData.valid };
    const foundDataNone = addAnswerData.foundData.valid;
    const foundDataAll = { ...addAnswerData.foundData.validAllAnswers };

    const stubData = {
      id: 1,
      body: inputData.body,
      QuestionId: inputData.QuestionId,
      UserId: userData.id,
      totalVotes: 0,
      isAcceptedAnswer: false,
      isActive: true,
      createdAt: '2022-11-09T12:40:46.128Z',
      updatedAt: '2022-11-09T12:40:46.128Z',
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

    it('should create answer successfully', async () => {
      const req = {
        body: inputData,
        user: userData,
      };

      const stubFindOne = sandbox.stub(Answer, 'findOne').resolves(foundDataNone);
      const stubCreate = sandbox.stub(Answer, 'create').resolves(stubData);
      const stubFindAll = sandbox.stub(Answer, 'findAll').resolves(foundDataAll);
      const stubUpdate = sandbox.stub(Question, 'update').resolves();

      await addAnswerCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(stubFindAll.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Answer added successfully');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const inputData = { ...addAnswerData.bodyData.valid };
    const userData = { ...addAnswerData.userData.invalid };
    const foundData = { ...addAnswerData.foundData.invalid };

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

    it('should not add answer successfully when answer is found with same body', async () => {
      const req = {
        body: inputData,
        user: userData,
      };

      const stubFind = sandbox.stub(Answer, 'findOne').resolves(foundData);

      await addAnswerCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Answer has already been added. Try another');
    });
  });
});
