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
const updateQuestnService = require('../../comments/services/updatePersonalComment.service');

// update comment test
describe('UPDATE PERSONAL COMMENT UNIT TEST', () => {
  const inputData = { ...commentData.bodyData.valid };
  const userData = { ...commentData.userData.valid };
  const paramsData = { ...commentData.paramsData.valid };
  const foundData = { ...commentData.foundData.valid };

  const stubData = {
    id: 1,
    body: inputData.body,
    AnswerId: inputData.AnswerId,
    UserId: userData.id,
    createdAt: foundData.createdAt,
    updatedAt: '2022-11-09T12:40:46.128Z',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should update comment successfully', async () => {
    const stubFindOne = sandbox.stub(Comment, 'findOne').resolves(foundData);
    const stubUpdate = sandbox.stub(Comment, 'update').resolves();
    const stubFindByPk = sandbox.stub(Comment, 'findByPk').resolves(stubData);

    const { body, AnswerId } = inputData;

    const response = await updateQuestnService(userData.id, paramsData.id, body, AnswerId);

    expect(stubFindOne.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(stubFindByPk.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('body', stubData.body);
    expect(response).to.have.property('AnswerId', stubData.AnswerId);
    expect(response).to.have.property('UserId', stubData.UserId);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
