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
const addCommentData = require('./addComment.data.mock.json');
const Comment = require('../../comments/models/Comment');
const Answer = require('../../answers/models/Answer');
const addCommentCtrl = require('../../comments/controllers/addComment.controller');

// add comment e2e test
describe('ADD COMMENT E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...addCommentData.bodyData.valid };
    const userData = { ...addCommentData.userData.valid };
    const foundDataNone = addCommentData.foundData.valid;
    const foundDataAll = { ...addCommentData.foundData.validAllComments };

    const stubData = {
      id: 1,
      body: inputData.body,
      AnswerId: inputData.AnswerId,
      UserId: userData.id,
      createdAt: '2022-11-09T12:40:46.128Z',
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

    it('should create comment successfully', async () => {
      const req = {
        body: inputData,
        user: userData,
      };

      const stubFindOne = sandbox.stub(Comment, 'findOne').resolves(foundDataNone);
      const stubCreate = sandbox.stub(Comment, 'create').resolves(stubData);
      const stubFindAll = sandbox.stub(Comment, 'findAll').resolves(foundDataAll);
      const stubUpdate = sandbox.stub(Answer, 'update').resolves();

      await addCommentCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(stubFindAll.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Comment added successfully');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const inputData = { ...addCommentData.bodyData.valid };
    const userData = { ...addCommentData.userData.invalid };
    const foundData = { ...addCommentData.foundData.invalid };

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

    it('should not add comment successfully when comment is found with same body', async () => {
      const req = {
        body: inputData,
        user: userData,
      };

      const stubFind = sandbox.stub(Comment, 'findOne').resolves(foundData);

      await addCommentCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Comment has already been added. Try another');
    });
  });
});
