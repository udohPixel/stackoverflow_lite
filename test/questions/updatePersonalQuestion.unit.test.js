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
const questionData = require('./updatePersonalQuestion.data.mock.json');
const Question = require('../../questions/models/Question');
const Category = require('../../categories/models/Category');
const updateQuestnService = require('../../questions/services/updatePersonalQuestion.service');

// update question test
describe('UPDATE PERSONAL QUESTION UNIT TEST', () => {
  const inputData = { ...questionData.bodyData.valid };
  const userData = { ...questionData.userData.valid };
  const paramsData = { ...questionData.paramsData.valid };
  const foundData = { ...questionData.foundData.valid };
  const foundDataCategory = { ...questionData.foundData.validCategory };

  const stubData = {
    id: paramsData.id,
    title: inputData.title,
    body: inputData.body,
    CategoryId: inputData.CategoryId,
    UserId: userData.id,
    createdAt: foundData.createdAt,
    updatedAt: '2022-11-10T17:40:00.128Z',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should update question successfully', async () => {
    const foundDataSaveQuestion = {
      ...foundData,
      save: sandbox.stub().resolves(stubData),
    };

    const stubFindCategory = sandbox.stub(Category, 'findOne').resolves(foundDataCategory);
    const stubFindOne = sandbox.stub(Question, 'findOne').resolves(foundDataSaveQuestion);

    const { title, body, CategoryId } = inputData;

    const response = await updateQuestnService(userData.id, paramsData.id, title, body, CategoryId);

    expect(stubFindCategory.calledOnce).to.be.true;
    expect(stubFindOne.calledOnce).to.be.true;
    expect(foundDataSaveQuestion.save.calledOnce).to.be.true;
    expect(response).to.be.an('object');
    expect(response).to.contain(stubData);
    expect(response).to.have.property('id', stubData.id);
    expect(response).to.have.property('title', stubData.title);
    expect(response).to.have.property('body', stubData.body);
    expect(response).to.have.property('CategoryId', stubData.CategoryId);
    expect(response).to.have.property('UserId', stubData.UserId);
    expect(response).to.have.property('createdAt', stubData.createdAt);
    expect(response).to.have.property('updatedAt', stubData.updatedAt);
  });
});
