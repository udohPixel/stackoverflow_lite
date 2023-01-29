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
const addCommentService = require('../../comments/services/addComment.service');

// add comment unit test
describe('ADD COMMENT UNIT TEST', () => {
  const inputData = { ...addCommentData.bodyData.valid };
  const userData = { ...addCommentData.userData.valid };
  const foundDataAnswer = { ...addCommentData.foundData.validAnswer };

  const stubData = {
    id: 1,
    body: inputData.body,
    AnswerId: inputData.AnswerId,
    UserId: userData.id,
    createdAt: '2022-11-09T12:40:46.128Z',
    updatedAt: '2022-11-09T12:40:46.128Z',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should create addComment successfully', async () => {
    const stubFindAnswer = sandbox.stub(Answer, 'findOne').resolves(foundDataAnswer);
    const stubCreate = sandbox.stub(Comment, 'create').resolves(stubData);
    const stubUpdate = sandbox.stub(Answer, 'update').resolves();

    const { body, AnswerId } = stubData;

    const response = await addCommentService(userData.id, body, AnswerId);

    expect(stubFindAnswer.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('body', stubData.body);
    expect(response).to.have.property('AnswerId', stubData.AnswerId);
    expect(response).to.have.property('UserId', stubData.UserId);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
