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
const deleteData = require('./deleteQuestion.data.mock.json');
const Question = require('../../questions/models/Question');
const deleteQuestionService = require('../../questions/services/deleteQuestion.service');
const Role = require('../../roles/models/Role');

// delete question test
describe('DELETE QUESTION UNIT TEST', () => {
  const paramsData = { ...deleteData.paramsData.valid };
  const userData = { ...deleteData.userData.valid };
  const foundData = { ...deleteData.foundData.valid };
  const foundDataRole = { ...deleteData.foundData.validRole };

  const stubData = {
    id: foundData.id,
    title: foundData.title,
    body: foundData.body,
    CategoryId: foundData.CategoryId,
    UserId: foundData.UserId,
    createdAt: foundData.createdAt,
    updatedAt: foundData.updatedAt,
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should delete question successfully', async () => {
    const stubFind = sandbox.stub(Question, 'findOne').resolves(foundData);
    const stubFindRole = sandbox.stub(Role, 'findByPk').resolves(foundDataRole);
    const stubDelete = sandbox.stub(Question, 'destroy').resolves(stubData);

    const response = await deleteQuestionService(userData.id, userData.RoleId, paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubFindRole.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('title', stubData.title);
    expect(response).to.have.property('body', stubData.body);
    expect(response).to.have.property('CategoryId', stubData.CategoryId);
    expect(response).to.have.property('UserId', stubData.UserId);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
