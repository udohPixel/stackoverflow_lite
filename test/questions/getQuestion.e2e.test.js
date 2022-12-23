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
const questionData = require('./getQuestion.data.mock.json');
const Question = require('../../questions/models/Question');
const getQuestionCtrl = require('../../questions/controllers/getQuestion.controller');

// get question test
describe('GET QUESTION E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...questionData.paramsData.valid };
    const foundData = { ...questionData.foundData.valid };

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

    it('should get question successfully', async () => {
      const req = {
        params: paramsData,
      };

      const stubFind = sandbox.stub(Question, 'findOne').resolves(foundData);

      await getQuestionCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Question found successfully');
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const paramsData = { ...questionData.paramsData.invalid };
    const foundDataNone = questionData.foundData.invalid;

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

    it('should not get question successfully', async () => {
      const req = {
        params: paramsData,
      };

      const stubFindNone = sandbox.stub(Question, 'findOne').resolves(foundDataNone);

      await getQuestionCtrl(req, res);

      expect(stubFindNone.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Question does not exist');
    });
  });
});
