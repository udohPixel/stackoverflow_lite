/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
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
const addQuestionData = require('./addQuestion.data.mock.json');
const Question = require('../../questions/models/Question');
const addQuestionCtrl = require('../../questions/controllers/addQuestion.controller');

// add question e2e test
describe('ADD QUESTION E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...addQuestionData.bodyData.valid };
    const userData = { ...addQuestionData.userData.valid };
    const foundDataNone = addQuestionData.foundData.valid;

    const stubData = {
      id: '1',
      title: inputData.title,
      body: inputData.body,
      CategoryId: inputData.CategoryId,
      UserId: userData.CategoryId,
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

    it('should create question successfully', async () => {
      const req = {
        body: inputData,
        user: userData,
      };

      const stubFindOne = sandbox.stub(Question, 'findOne').resolves(foundDataNone);
      const stubCreate = sandbox.stub(Question, 'create').resolves(stubData);

      await addQuestionCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Question added successful');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const inputData = { ...addQuestionData.bodyData.valid };
    const userData = { ...addQuestionData.userData.invalid };
    const foundData = { ...addQuestionData.foundData.invalid };

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

    it('should not add question successfully when question is found with same title', async () => {
      const req = {
        body: inputData,
        user: userData,
      };

      const stubFind = sandbox.stub(Question, 'findOne').resolves(foundData);

      await addQuestionCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Question has already been added. Try another');
    });
  });
});
