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
const deleteCommentService = require('../../comments/services/deleteComment.service');
const Role = require('../../roles/models/Role');
const Answer = require('../../answers/models/Answer');

// delete comment test
describe('DELETE COMMENT UNIT TEST', () => {
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

  afterEach(() => {
    sandbox.restore();
  });

  it('should delete comment successfully', async () => {
    const stubFind = sandbox.stub(Comment, 'findOne').resolves(foundData);
    const stubFindRole = sandbox.stub(Role, 'findByPk').resolves(foundDataRole);
    const stubDelete = sandbox.stub(Comment, 'destroy').resolves(stubData);
    const stubUpdate = sandbox.stub(Answer, 'update').resolves();

    const response = await deleteCommentService(userData.id, userData.RoleId, paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubFindRole.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('body', stubData.body);
    expect(response).to.have.property('AnswerId', stubData.AnswerId);
    expect(response).to.have.property('UserId', stubData.UserId);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
