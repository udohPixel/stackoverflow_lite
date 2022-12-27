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
const deleteData = require('./deleteAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const deleteAnswerService = require('../../answers/services/deleteAnswer.service');
const Role = require('../../roles/models/Role');

// delete answer test
describe('DELETE ANSWER UNIT TEST', () => {
  const paramsData = { ...deleteData.paramsData.valid };
  const userData = { ...deleteData.userData.valid };
  const foundData = { ...deleteData.foundData.valid };
  const foundDataRole = { ...deleteData.foundData.validRole };

  const stubData = {
    id: foundData.id,
    body: foundData.body,
    QuestionId: foundData.QuestionId,
    UserId: foundData.UserId,
    totalVotes: foundData.totalVotes,
    isAcceptedAnswer: foundData.isAcceptedAnswer,
    isActive: foundData.isActive,
    createdAt: foundData.createdAt,
    updatedAt: foundData.updatedAt,
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should delete answer successfully', async () => {
    const stubFind = sandbox.stub(Answer, 'findOne').resolves(foundData);
    const stubFindRole = sandbox.stub(Role, 'findByPk').resolves(foundDataRole);
    const stubDelete = sandbox.stub(Answer, 'destroy').resolves(stubData);

    const response = await deleteAnswerService(userData.id, userData.RoleId, paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubFindRole.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('body', stubData.body);
    expect(response).to.have.property('QuestionId', stubData.QuestionId);
    expect(response).to.have.property('UserId', stubData.UserId);
    expect(response).to.have.property('totalVotes', stubData.totalVotes);
    expect(response).to.have.property('isAcceptedAnswer', stubData.isAcceptedAnswer);
    expect(response).to.have.property('isActive', stubData.isActive);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
