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
const questionData = require('./getAllQuestions.data.mock.json');
const Question = require('../../questions/models/Question');
const Category = require('../../categories/models/Category');
const getAllQuestionsCtrl = require('../../questions/controllers/getAllQuestions.controller');

// get all questions test
describe('GET ALL USER QUESTIONS E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const queryData = { ...questionData.queryData.valid };
    const foundDataCategory = { ...questionData.foundData.validCategory };

    const stubData = [
      {
        id: 3,
        title: 'My third question title',
        body: 'This is a sample question content for my third question',
        CategoryId: 1,
        UserId: 1,
        totalAnswers: 0,
        createdAt: '2022-12-21T13:43:25.000Z',
        updatedAt: '2022-12-21T13:43:25.000Z',
      },
      {
        id: 2,
        title: 'My second question title',
        body: 'This is a sample question content for my second question',
        CategoryId: 1,
        UserId: 1,
        totalAnswers: 0,
        createdAt: '2022-12-21T13:43:06.000Z',
        updatedAt: '2022-12-21T13:43:06.000Z',
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

    it('should get all questions successfully', async () => {
      const req = {
        query: queryData,
      };

      const stubFindCategory = sandbox.stub(Category, 'findOne').resolves(foundDataCategory);
      const stubFindQuestions = sandbox.stub(Question, 'findAll').resolves(stubData);

      await getAllQuestionsCtrl(req, res);

      expect(stubFindCategory.calledOnce).to.be.true;
      expect(stubFindQuestions.calledOnce).to.be.true;
      const stubFindQuestionsCallArg = stubFindQuestions.getCalls()[0].args[0];
      expect(stubFindQuestionsCallArg).to.be.an('object');
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Questions found successfully');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const queryData = { ...questionData.queryData.valid };
    const foundDataCategoryNone = questionData.foundData.invalid;

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

    it('should get all questions successfully when user is not found', async () => {
      const req = {
        query: queryData,
      };

      const stubFindCategory = sandbox.stub(Category, 'findOne').resolves(foundDataCategoryNone);

      await getAllQuestionsCtrl(req, res);

      expect(stubFindCategory.calledOnce).to.be.true;
      const stubFindCategoryCallArg = stubFindCategory.getCalls()[0].args[0];
      expect(stubFindCategoryCallArg).to.be.an('object');
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Category does not exist');
    });
  });
});
