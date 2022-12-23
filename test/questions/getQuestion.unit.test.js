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
const questionData = require('./getQuestion.data.mock.json');
const Question = require('../../questions/models/Question');
const getQuestionService = require('../../questions/services/getQuestion.service');

// get question test
describe('GET QUESTION UNIT TEST', () => {
  const paramsData = { ...questionData.paramsData.valid };
  const foundData = { ...questionData.foundData.valid };

  afterEach(() => {
    sandbox.restore();
  });

  it('should get question successfully', async () => {
    const stubFind = sandbox.stub(Question, 'findOne').resolves(foundData);

    const response = await getQuestionService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.have.property('id', foundData.id);
    expect(response).to.have.property('title', foundData.title);
    expect(response).to.have.property('body', foundData.body);
    expect(response).to.have.property('CategoryId', foundData.CategoryId);
    expect(response).to.have.property('UserId', foundData.UserId);
    expect(response).to.have.property('totalAnswers', foundData.totalAnswers);
    expect(response).to.have.property('isActive', foundData.isActive);
    expect(response).to.have.property('createdAt', foundData.createdAt);
    expect(response).to.have.property('updatedAt', foundData.updatedAt);
  });
});
