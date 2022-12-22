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
const deleteData = require('./deleteQuestion.data.mock.json');
const Question = require('../../questions/models/Question');
const deleteQuestionCtrl = require('../../questions/controllers/deleteQuestion.controller');
const Role = require('../../roles/models/Role');

// delete question test
describe('DELETE QUESTION E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...deleteData.paramsData.valid };
    const userData = { ...deleteData.userData.valid };
    const foundData = { ...deleteData.foundData.valid };
    const foundDataRole = { ...deleteData.foundData.validRole };

    const stubData = {
      id: foundData.id,
      title: foundData.title,
      body: foundData.body,
      CategoryId: foundData.CategoryId,
      UserId: foundData.UserId,
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

    it('should delete a question successfully', async () => {
      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFind = sandbox.stub(Question, 'findOne').resolves(foundData);
      const stubFindRole = sandbox.stub(Role, 'findByPk').resolves(foundDataRole);
      const stubDelete = sandbox.stub(Question, 'destroy').resolves(stubData);

      await deleteQuestionCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubFindRole.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Question deleted successfully');
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

    it('should not delete a question successfully when question is not found by id', async () => {
      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFind = sandbox.stub(Question, 'findOne').resolves(foundDataNone);

      await deleteQuestionCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Question does not exist');
    });
  });
});
