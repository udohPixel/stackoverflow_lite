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
const commentData = require('./getAllComments.data.mock.json');
const Comment = require('../../comments/models/Comment');
const Answer = require('../../answers/models/Answer');
const getAllCommentsCtrl = require('../../comments/controllers/getAllComments.controller');

// get all comments test
describe('GET ALL COMMENTS E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const queryData = { ...commentData.queryData.valid };
    const paramsData = { ...commentData.paramsData.valid };
    const foundDataAnswer = { ...commentData.foundData.valid };

    const stubData = [
      {
        id: 2,
        body: 'This is a sample comment content for a answer. Some more sample content of the comment body to fill up more space goes here. ',
        AnswerId: 2,
        UserId: 1,
        createdAt: '2022-12-26T09:40:02.000Z',
        updatedAt: '2022-12-26T09:40:02.000Z',
      },
      {
        id: 1,
        body: 'This is a sample comment content for my second answer',
        AnswerId: 2,
        UserId: 1,
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

    it('should get all comments successfully', async () => {
      const req = {
        query: queryData,
        params: paramsData,
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
      const stubFindComments = sandbox.stub(Comment, 'findAll').resolves(stubData);

      await getAllCommentsCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindComments.calledOnce).to.be.true;
      const stubFindCommentsCallArg = stubFindComments.getCalls()[0].args[0];
      expect(stubFindCommentsCallArg).to.be.an('object');
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Comments found successfully');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const paramsData = { ...commentData.paramsData.invalid };
    const foundDataAnswerNone = commentData.foundData.invalid;

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

    it('should not get all comments successfully when answer is not found', async () => {
      const req = {
        params: paramsData,
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswerNone);

      await getAllCommentsCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Answer does not exist');
    });
  });
});
