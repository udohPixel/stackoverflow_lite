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
const answerData = require('./updatePersonalAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const updateQuestnService = require('../../answers/services/updatePersonalAnswer.service');

// update answer test
describe('UPDATE PERSONAL ANSWER UNIT TEST', () => {
  const inputData = { ...answerData.bodyData.valid };
  const userData = { ...answerData.userData.valid };
  const paramsData = { ...answerData.paramsData.valid };
  const foundData = { ...answerData.foundData.valid };

  const stubData = {
    id: paramsData.id,
    body: inputData.body,
    QuestionId: inputData.QuestionId,
    UserId: userData.id,
    totalVotes: foundData.totalVotes,
    isAcceptedAnswer: foundData.isAcceptedAnswer,
    isActive: foundData.isActive,
    createdAt: foundData.createdAt,
    updatedAt: '2022-11-10T17:40:00.128Z',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should update answer successfully', async () => {
    const stubFindOne = sandbox.stub(Answer, 'findOne').resolves(foundData);
    const stubUpdate = sandbox.stub(Answer, 'update').resolves();
    const stubFindByPk = sandbox.stub(Answer, 'findByPk').resolves(stubData);

    const { body, QuestionId } = inputData;

    const response = await updateQuestnService(userData.id, paramsData.id, body, QuestionId);

    expect(stubFindOne.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(stubFindByPk.calledOnce).to.be.true;
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
