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
const commentData = require('./getAllUserComments.data.mock.json');
const Comment = require('../../comments/models/Comment');
const User = require('../../users/models/User');
const getAllUserCommentsCtrl = require('../../comments/controllers/getAllUserComments.controller');

// get all user comments test
describe('GET ALL USER COMMENTS E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...commentData.paramsData.valid };
    const queryData = { ...commentData.queryData.valid };
    const foundDataUser = { ...commentData.foundData.validUser };

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

    it('should get all user comments successfully', async () => {
      const req = {
        params: paramsData,
        query: queryData,
      };

      const stubFindUser = sandbox.stub(User, 'findOne').resolves(foundDataUser);
      const stubFindComments = sandbox.stub(Comment, 'findAll').resolves(stubData);

      await getAllUserCommentsCtrl(req, res);

      expect(stubFindUser.calledOnce).to.be.true;
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

    it('should not get all user comments successfully when user is not found', async () => {
      const paramsData = { ...commentData.paramsData.invalid };
      const foundDataUser = commentData.foundData.invalid;

      const req = {
        params: paramsData,
      };

      const stubFindUser = sandbox.stub(User, 'findOne').resolves(foundDataUser);

      await getAllUserCommentsCtrl(req, res);

      expect(stubFindUser.calledOnce).to.be.true;
      const stubFindUserCallArg = stubFindUser.getCalls()[0].args[0];
      expect(stubFindUserCallArg).to.be.an('object');
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('User does not exist');
    });
  });
});
