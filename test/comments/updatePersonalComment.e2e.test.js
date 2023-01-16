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
const commentData = require('./updatePersonalComment.data.mock.json');
const Comment = require('../../comments/models/Comment');
const Answer = require('../../answers/models/Answer');
const updateCommentCtrl = require('../../comments/controllers/updatePersonalComment.controller');

// update comment test
describe('UPDATE COMMENT ANSWER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...commentData.bodyData.valid };
    const userData = { ...commentData.userData.valid };
    const paramsData = { ...commentData.paramsData.valid };
    const foundData = { ...commentData.foundData.valid };
    const foundDataAnswer = { ...commentData.foundData.validAnswer };

    const stubData = {
      id: 1,
      body: inputData.body,
      AnswerId: inputData.AnswerId,
      UserId: userData.id,
      createdAt: foundData.createdAt,
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

    it('should update comment successfully', async () => {
      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const foundDataSaveComment = {
        ...foundData,
        save: sandbox.stub().resolves(stubData),
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findOne').resolves(foundDataAnswer);
      const stubFindOne = sandbox.stub(Comment, 'findOne').resolves(foundDataSaveComment);

      await updateCommentCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindOne.calledOnce).to.be.true;
      expect(foundDataSaveComment.save.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Comment updated successfully');
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
      sandbox.restore();
    });

    it('should not update a comment successfully when comment is not found by id', async () => {
      const inputData = { ...commentData.bodyData.valid };
      const userData = { ...commentData.userData.valid };
      const paramsData = { ...commentData.paramsData.invalid };
      const foundDataNone = commentData.foundData.invalid;
      const foundDataAnswer = { ...commentData.foundData.validAnswer };

      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };
      const stubFindAnswer = sandbox.stub(Answer, 'findOne').resolves(foundDataAnswer);
      const stubFindOne = sandbox.stub(Comment, 'findOne').resolves(foundDataNone);

      await updateCommentCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindOne.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Comment does not exist');
    });

    it('should not update a comment successfully when logged in user is not creator of the comment', async () => {
      const inputData = { ...commentData.bodyData.valid };
      const userData = { ...commentData.userData.invalid };
      const paramsData = { ...commentData.paramsData.valid };
      const foundData = { ...commentData.foundData.invalidUser };
      const foundDataAnswer = { ...commentData.foundData.validAnswer };

      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const stubFindAnswer = sandbox.stub(Answer, 'findOne').resolves(foundDataAnswer);
      const stubFindOne = sandbox.stub(Comment, 'findOne').resolves(foundData);

      await updateCommentCtrl(req, res);

      expect(stubFindAnswer.calledOnce).to.be.true;
      expect(stubFindOne.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(403);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('You are not allowed to update comment');
    });
  });
});
