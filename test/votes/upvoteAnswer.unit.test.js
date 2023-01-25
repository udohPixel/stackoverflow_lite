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
const voteData = require('./upvoteAnswer.data.mock.json');
const Answer = require('../../answers/models/Answer');
const Vote = require('../../votes/models/Vote');
const upvoteAnswerService = require('../../votes/services/upvoteAnswer.service');

// upvote answer test
describe('UPVOTE ANSWER UNIT TEST', () => {
  const userData = { ...voteData.userData.valid };
  const paramsData = { ...voteData.paramsData.valid };
  const foundDataAnswer = { ...voteData.foundData.validAnswer };
  const foundDataNone = voteData.foundData.invalid;
  const foundDataCreate = { ...voteData.foundData.validCreateVote };
  const foundDataVote = { ...voteData.foundData.validFoundVote };

  const stubDataNewUpvote = {
    id: foundDataCreate.id,
    AnswerId: foundDataCreate.AnswerId,
    UserId: foundDataCreate.UserId,
    isUpvote: foundDataCreate.isUpvote,
    updatedAt: foundDataCreate.createdAt,
    createdAt: foundDataCreate.updatedAt,
  };

  const stubDataUpdatedUpvote = {
    id: foundDataVote.id,
    AnswerId: foundDataVote.AnswerId,
    UserId: foundDataVote.UserId,
    isUpvote: true,
    updatedAt: foundDataVote.createdAt,
    createdAt: foundDataVote.updatedAt,
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should create new answer upvote successfully when user upvoted answer does not exist', async () => {
    const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
    const stubFindVote = sandbox.stub(Vote, 'findOne').resolves(foundDataNone);
    const stubCreateVote = sandbox.stub(Vote, 'create').resolves(stubDataNewUpvote);
    const stubUpdateAnswer = sandbox.stub(Answer, 'update').resolves();

    const response = await upvoteAnswerService(paramsData.id, userData.id);

    expect(stubFindAnswer.calledOnce).to.be.true;
    expect(stubFindVote.calledOnce).to.be.true;
    expect(stubCreateVote.calledOnce).to.be.true;
    expect(stubUpdateAnswer.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubDataNewUpvote.id);
    expect(response).to.have.property('AnswerId', stubDataNewUpvote.AnswerId);
    expect(response).to.have.property('UserId', stubDataNewUpvote.UserId);
    expect(response).to.have.property('isUpvote', stubDataNewUpvote.isUpvote);
    expect(response).to.have.property('createdAt', stubDataNewUpvote.createdAt);
    expect(response).to.have.property('updatedAt', stubDataNewUpvote.updatedAt);
  });

  it('should update user upvoted answer successfully when user had previously downvoted answer', async () => {
    const foundDataSaveVote = {
      ...foundDataVote,
      save: sandbox.stub().resolves(stubDataUpdatedUpvote),
    };

    const stubFindAnswer = sandbox.stub(Answer, 'findByPk').resolves(foundDataAnswer);
    const stubFindVote = sandbox.stub(Vote, 'findOne').resolves(foundDataSaveVote);
    const stubUpdateAnswer = sandbox.stub(Answer, 'update').resolves();

    const response = await upvoteAnswerService(paramsData.id, userData.id);

    expect(stubFindAnswer.calledOnce).to.be.true;
    expect(stubFindVote.calledOnce).to.be.true;
    expect(foundDataSaveVote.save.calledOnce).to.be.true;
    expect(stubUpdateAnswer.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', stubDataUpdatedUpvote.id);
    expect(response).to.have.property('AnswerId', stubDataUpdatedUpvote.AnswerId);
    expect(response).to.have.property('UserId', stubDataUpdatedUpvote.UserId);
    expect(response).to.have.property('isUpvote', stubDataUpdatedUpvote.isUpvote);
    expect(response).to.have.property('createdAt', stubDataUpdatedUpvote.createdAt);
    expect(response).to.have.property('updatedAt', stubDataUpdatedUpvote.updatedAt);
  });
});
