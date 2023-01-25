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
const voteData = require('./upvoteAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const Vote = require('../../votes/models/Vote');
const upvoteAnswerCtrl = require('../../votes/controllers/upvoteAnswer.controller');

// upvote answer test
describe('UPVOTE ANSWER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const userData = { ...voteData.userData.valid };
    const paramsData = { ...voteData.paramsData.valid };
    const foundDataAnswer = { ...voteData.foundData.validAnswer };
    const foundDataNone = voteData.foundData.invalid;
    const foundDataCreate = { ...voteData.foundData.validCreateVote };
    const foundDataVote = { ...voteData.foundData.validFoundVote };

    const stubDataNewUpvote = {
      id: foundDataCreate.id,
      AnswerId: foundDataCreate.AnswerId,
      UserId: foundDataCreate.UserId,
      isUpvote: foundDataCreate.isUpvote,
      updatedAt: foundDataCreate.createdAt,
      createdAt: foundDataCreate.updatedAt,
    };

    const stubDataUpdatedUpvote = {
      id: foundDataVote.id,
      AnswerId: foundDataVote.AnswerId,
      UserId: foundDataVote.UserId,
      isUpvote: true,
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

    it('should create new answer upvote successfully when user upvoted answer does not exist', async () => {
      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
      const stubFindVote = sandbox.stub(Vote, 'findOne').resolves(foundDataNone);
      const stubCreateVote = sandbox.stub(Vote, 'create').resolves(stubDataNewUpvote);
      const stubUpdateAnswer = sandbox.stub(Answer, 'update').resolves();

      await upvoteAnswerCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindVote.calledOnce).to.be.true;
      expect(stubCreateVote.calledOnce).to.be.true;
      expect(stubUpdateAnswer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Answer upvoted successfully');
      expect(json.args[0][0].data).to.equal(stubDataNewUpvote);
    });

    it('should update user upvoted answer successfully when user had previously downvoted answer', async () => {
      const req = {
        user: userData,
        params: paramsData,
      };

      const foundDataUpdateVote = {
        ...foundDataVote,
        save: sandbox.stub().resolves(stubDataUpdatedUpvote),
      };
      const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
      const stubFindVote = sandbox.stub(Vote, 'findOne').resolves(foundDataUpdateVote);
      const stubUpdateAnswer = sandbox.stub(Answer, 'update').resolves();

      await upvoteAnswerCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindVote.calledOnce).to.be.true;
      expect(foundDataUpdateVote.save.calledOnce).to.be.true;
      expect(stubUpdateAnswer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Answer upvoted successfully');
      expect(json.args[0][0].data).to.equal(stubDataUpdatedUpvote);
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

    it('should not upvote an answer successfully when answer is not found by id', async () => {
      const userData = { ...voteData.userData.valid };
      const paramsData = { ...voteData.paramsData.invalid };
      const foundDataNone = voteData.foundData.invalid;

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataNone);

      await upvoteAnswerCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Answer does not exist');
    });

    it('should not upvote an answer successfully '
    + 'when user has already upvoted answer', async () => {
      const userData = { ...voteData.userData.valid };
      const paramsData = { ...voteData.paramsData.valid };
      const foundDataAnswer = { ...voteData.foundData.validAnswer };
      const foundDataVote = { ...voteData.foundData.invalidFoundVote };

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
      const stubFindVote = sandbox.stub(Vote, 'findOne').resolves(foundDataVote);

      await upvoteAnswerCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindVote.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('You have already upvoted this answer');
    });
  });
});
