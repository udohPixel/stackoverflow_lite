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
const deleteData = require('./deleteComment.data.mock.json');
const Comment = require('../../comments/models/Comment');
const deleteCommentCtrl = require('../../comments/controllers/deleteComment.controller');
const Role = require('../../roles/models/Role');
const Answer = require('../../answers/models/Answer');

// delete comment test
describe('DELETE COMMENT E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...deleteData.paramsData.valid };
    const userData = { ...deleteData.userData.valid };
    const foundData = { ...deleteData.foundData.valid };
    const foundDataRole = { ...deleteData.foundData.validRole };

    const stubData = {
      id: foundData.id,
      body: foundData.body,
      AnswerId: foundData.AnswerId,
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

    it('should delete a comment successfully', async () => {
      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFind = sandbox.stub(Comment, 'findOne').resolves(foundData);
      const stubFindRole = sandbox.stub(Role, 'findByPk').resolves(foundDataRole);
      const stubDelete = sandbox.stub(Comment, 'destroy').resolves(stubData);
      const stubUpdate = sandbox.stub(Answer, 'update').resolves();

      await deleteCommentCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubFindRole.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Comment deleted successfully');
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

    it('should not delete a comment successfully when comment is not found by id', async () => {
      const req = {
        params: paramsData,
        user: userData,
      };

      const stubFind = sandbox.stub(Comment, 'findOne').resolves(foundDataNone);

      await deleteCommentCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Comment does not exist');
    });
  });
});
