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
const deleteData = require('./deleteAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const deleteAnswerCtrl = require('../../answers/controllers/deleteAnswer.controller');
const Role = require('../../roles/models/Role');
const Question = require('../../questions/models/Question');

// delete answer test
describe('DELETE ANSWER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...deleteData.paramsData.valid };
    const userData = { ...deleteData.userData.valid };
    const foundData = { ...deleteData.foundData.valid };
    const foundDataRole = { ...deleteData.foundData.validRole };
    const foundDataAll = { ...deleteData.foundData.validAllAnswers };

    const stubData = {
      id: foundData.id,
      body: foundData.body,
      QuestionId: foundData.QuestionId,
      UserId: foundData.UserId,
      totalVotes: foundData.totalVotes,
      isAcceptedAnswer: foundData.isAcceptedAnswer,
      isActive: foundData.isActive,
      createdAt: foundData.createdAt,
      updatedAt: foundData.updatedAt,
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

    it('should delete a answer successfully', async () => {
      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFind = sandbox.stub(Answer, 'findOne').resolves(foundData);
      const stubFindRole = sandbox.stub(Role, 'findByPk').resolves(foundDataRole);
      const stubDelete = sandbox.stub(Answer, 'destroy').resolves(stubData);
      const stubFindAll = sandbox.stub(Answer, 'findAll').resolves(foundDataAll);
      const stubUpdate = sandbox.stub(Question, 'update').resolves();

      await deleteAnswerCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubFindRole.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(stubFindAll.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Answer deleted successfully');
    });
  });

  describe('NEGATIVE TEST', () => {
    const paramsData = { ...deleteData.paramsData.invalid };
    const userData = { ...deleteData.userData.invalid };
    const foundDataNone = deleteData.foundData.invalid;

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

    it('should not delete a answer successfully when answer is not found by id', async () => {
      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFind = sandbox.stub(Answer, 'findOne').resolves(foundDataNone);

      await deleteAnswerCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Answer does not exist');
    });
  });
});
