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
const questionData = require('./updateQuestionStatus.data.mock.json');
const Question = require('../../questions/models/Question');
const updateQuestionStatusCtrl = require('../../questions/controllers/updateQuestionStatus.controller');

// update question status test
describe('CHANGE USER STATE E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...questionData.paramsData.valid };
    const foundData = { ...questionData.foundData.valid };

    const stubData = {
      id: foundData.id,
      title: foundData.title,
      body: foundData.body,
      CategoryId: foundData.CategoryId,
      UserId: foundData.UserId,
      isActive: false,
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

    it('should update a question active status successfully', async () => {
      const req = {
        params: paramsData,
      };

      const stubFind = sandbox.stub(Question, 'findByPk').resolves(foundData);
      const stubUpdate = sandbox.stub(Question, 'update').resolves();

      await updateQuestionStatusCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Question status updated successfully');
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

    it('should not update a question active status successfully when question is not found by id', async () => {
      const paramsData = { ...questionData.paramsData.invalid };
      const foundDataNone = questionData.foundData.invalid;

      const req = {
        params: paramsData,
      };

      const stubFind = sandbox.stub(Question, 'findByPk').resolves(foundDataNone);

      await updateQuestionStatusCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Question does not exist');
    });
  });
});
