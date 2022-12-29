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
const voteData = require('./downvoteAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const Vote = require('../../votes/models/Vote');
const downvoteAnswerCtrl = require('../../votes/controllers/downvoteAnswer.controller');

// downvote answer test
describe('DOWNVOTE ANSWER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const userData = { ...voteData.userData.valid };
    const paramsData = { ...voteData.paramsData.valid };
    const foundDataAnswer = { ...voteData.foundData.validAnswer };
    const foundDataNone = voteData.foundData.invalid;
    const foundDataCreate = { ...voteData.foundData.validCreateVote };
    const foundDataVote = { ...voteData.foundData.validFoundVote };

    const stubDataNewDownvote = {
      id: foundDataCreate.id,
      AnswerId: foundDataCreate.AnswerId,
      UserId: foundDataCreate.UserId,
      isUpvote: foundDataCreate.isUpvote,
      updatedAt: foundDataCreate.createdAt,
      createdAt: foundDataCreate.updatedAt,
    };

    const stubDataUpdatedDownvote = {
      id: foundDataVote.id,
      AnswerId: foundDataVote.AnswerId,
      UserId: foundDataVote.UserId,
      isUpvote: false,
      updatedAt: foundDataVote.createdAt,
      createdAt: foundDataVote.updatedAt,
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

    it('should create new answer downvote successfully when user downvoted answer does not exist', async () => {
      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
      const stubFindVote = sandbox.stub(Vote, 'findAll').resolves(foundDataNone);
      const stubCreateVote = sandbox.stub(Vote, 'create').resolves(stubDataNewDownvote);
      const stubUpdateAnswer = sandbox.stub(Answer, 'update').resolves();

      await downvoteAnswerCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindVote.calledOnce).to.be.true;
      expect(stubCreateVote.calledOnce).to.be.true;
      expect(stubUpdateAnswer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Answer downvoted successfully');
      expect(json.args[0][0].data).to.equal(stubDataNewDownvote);
    });

    it('should update user downvoted answer successfully when user had previously downvoted answer', async () => {
      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
      const stubFindVoteAll = sandbox.stub(Vote, 'findAll').resolves(foundDataVote);
      const stubFindVoteOne = sandbox.stub(Vote, 'findOne').resolves(foundDataNone);
      const stubUpdateVote = sandbox.stub(Vote, 'update').resolves(stubDataUpdatedDownvote);
      const stubUpdateAnswer = sandbox.stub(Answer, 'update').resolves();

      await downvoteAnswerCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindVoteAll.calledOnce).to.be.true;
      expect(stubFindVoteOne.calledOnce).to.be.true;
      expect(stubUpdateVote.calledOnce).to.be.true;
      expect(stubUpdateAnswer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Answer downvoted successfully');
      expect(json.args[0][0].data).to.equal(stubDataUpdatedDownvote);
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

    after(() => {
      sandbox.restore();
    });

    afterEach(() => {
      Answer.findByPk.restore();
    });

    it('should not downvote an answer successfully when answer is not found by id', async () => {
      const userData = { ...voteData.userData.valid };
      const paramsData = { ...voteData.paramsData.invalid };
      const foundDataNone = voteData.foundData.invalid;

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFindAnswer = sinon.stub(Answer, 'findByPk').resolves(foundDataNone);

      await downvoteAnswerCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Answer does not exist');
    });

    it('should not downvote an answer successfully '
    + 'when user has already downvoted answer', async () => {
      const userData = { ...voteData.userData.valid };
      const paramsData = { ...voteData.paramsData.valid };
      const foundDataAnswer = { ...voteData.foundData.validAnswer };
      const foundDataVoteAll = { ...voteData.foundData.validFoundVote };
      const foundDataVoteOne = { ...voteData.foundData.invalidFoundVote };

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
      const stubFindVoteAll = sandbox.stub(Vote, 'findAll').resolves(foundDataVoteAll);
      const stubFindVoteOne = sandbox.stub(Vote, 'findOne').resolves(foundDataVoteOne);

      await downvoteAnswerCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindVoteAll.calledOnce).to.be.true;
      expect(stubFindVoteOne.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('You have already downvoted this answer');
    });
  });
});
