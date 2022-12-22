// import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

// assertions
const { expect } = chai;

// use chai http
chai.use(chaiHttp);

// import other libraries
const questionData = require('./updatePersonalQuestion.data.mock.json');
const Question = require('../../questions/models/Question');
const updateQuestionCtrl = require('../../questions/controllers/updatePersonalQuestion.controller');

// update question test
describe('UPDATE PERSONAL QUESTION E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...questionData.bodyData.valid };
    const userData = { ...questionData.userData.valid };
    const paramsData = { ...questionData.paramsData.valid };
    const foundData = { ...questionData.foundData.valid };

    const stubData = {
      id: paramsData.id,
      title: inputData.title,
      body: inputData.body,
      CategoryId: inputData.CategoryId,
      UserId: userData.id,
      createdAt: '2022-11-10T17:40:00.128Z',
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
      Question.findOne.restore();
      Question.update.restore();
      Question.findByPk.restore();
    });

    it('should update a question successfully', async () => {
      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const stubFindOne = sinon.stub(Question, 'findOne').resolves(foundData);
      const stubUpdate = sinon.stub(Question, 'update').resolves();
      const stubFindByPk = sinon.stub(Question, 'findByPk').resolves(stubData);

      await updateQuestionCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(stubFindByPk.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Question updated successfully');
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
      Question.findOne.restore();
    });

    it('should not update a question successfully when question is not found by id', async () => {
      const inputData = { ...questionData.bodyData.valid.questionInfo };
      const userData = { ...questionData.userData.valid };
      const paramsData = { ...questionData.paramsData.invalid };
      const foundDataNone = questionData.foundData.invalid;

      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const stubFindOne = sinon.stub(Question, 'findOne').resolves(foundDataNone);

      await updateQuestionCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Question does not exist');
    });

    it('should not update a question successfully when logged in user is not creator of the question', async () => {
      const inputData = { ...questionData.bodyData.valid.questionInfo };
      const userData = { ...questionData.userData.invalid };
      const paramsData = { ...questionData.paramsData.valid };
      const foundData = { ...questionData.foundData.invalidUser };

      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const stubFindOne = sinon.stub(Question, 'findOne').resolves(foundData);

      await updateQuestionCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(401);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Unauthorized');
    });
  });
});
