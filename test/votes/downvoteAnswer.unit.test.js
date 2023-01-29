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
const voteData = require('./downvoteAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const Vote = require('../../votes/models/Vote');
const downvoteAnswerService = require('../../votes/services/downvoteAnswer.service');

// downvote answer test
describe('DOWNVOTE ANSWER UNIT TEST', () => {
  const userData = { ...voteData.userData.valid };
  const paramsData = { ...voteData.paramsData.valid };
  const foundDataAnswer = { ...voteData.foundData.validAnswer };
  const foundDataNone = voteData.foundData.invalid;
  const foundDataCreate = { ...voteData.foundData.validCreateVote };
  const foundDataVote = { ...voteData.foundData.validFoundVote };

  const stubDataNewDownvote = {
    id: foundDataCreate.id,
    AnswerId: foundDataCreate.AnswerId,
    UserId: foundDataCreate.UserId,
    isUpvote: foundDataCreate.isUpvote,
    updatedAt: foundDataCreate.createdAt,
    createdAt: foundDataCreate.updatedAt,
  };

  const stubDataUpdatedDownvote = {
    id: foundDataVote.id,
    AnswerId: foundDataVote.AnswerId,
    UserId: foundDataVote.UserId,
    isUpvote: false,
    updatedAt: foundDataVote.createdAt,
    createdAt: foundDataVote.updatedAt,
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should create new answer downvote successfully when user downvoted answer does not exist', async () => {
    const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
    const stubFindVote = sandbox.stub(Vote, 'findOne').resolves(foundDataNone);
    const stubCreateVote = sandbox.stub(Vote, 'create').resolves(stubDataNewDownvote);
    const stubUpdateAnswer = sandbox.stub(Answer, 'update').resolves();

    const response = await downvoteAnswerService(paramsData.id, userData.id);

    expect(stubFindAnswer.calledOnce).to.be.true;
    expect(stubFindVote.calledOnce).to.be.true;
    expect(stubCreateVote.calledOnce).to.be.true;
    expect(stubUpdateAnswer.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubDataNewDownvote.id);
    expect(response).to.have.property('AnswerId', stubDataNewDownvote.AnswerId);
    expect(response).to.have.property('UserId', stubDataNewDownvote.UserId);
    expect(response).to.have.property('isUpvote', stubDataNewDownvote.isUpvote);
    expect(response).to.have.property('createdAt', stubDataNewDownvote.createdAt);
    expect(response).to.have.property('updatedAt', stubDataNewDownvote.updatedAt);
  });

  it('should update user downvoted answer successfully when user had previously downvoted answer', async () => {
    const foundDataUpdateVote = {
      ...foundDataVote,
      save: sandbox.stub().resolves(stubDataUpdatedDownvote),
    };
    const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
    const stubFindVote = sandbox.stub(Vote, 'findOne').resolves(foundDataUpdateVote);
    const stubUpdateAnswer = sandbox.stub(Answer, 'update').resolves();

    const response = await downvoteAnswerService(paramsData.id, userData.id);

    expect(stubFindAnswer.calledOnce).to.be.true;
    expect(stubFindVote.calledOnce).to.be.true;
    expect(foundDataUpdateVote.save.calledOnce).to.be.true;
    expect(stubUpdateAnswer.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubDataUpdatedDownvote.id);
    expect(response).to.have.property('AnswerId', stubDataUpdatedDownvote.AnswerId);
    expect(response).to.have.property('UserId', stubDataUpdatedDownvote.UserId);
    expect(response).to.have.property('isUpvote', stubDataUpdatedDownvote.isUpvote);
    expect(response).to.have.property('createdAt', stubDataUpdatedDownvote.createdAt);
    expect(response).to.have.property('updatedAt', stubDataUpdatedDownvote.updatedAt);
  });
});
