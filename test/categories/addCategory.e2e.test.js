/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
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
const addCategoryData = require('./addCategory.data.mock.json');
const Category = require('../../categories/models/Category');
const addCategoryCtrl = require('../../categories/controllers/addCategory.controller');

// add category e2e test
describe('ADD CATEGORY E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...addCategoryData.bodyData.valid };
    const foundDataNone = addCategoryData.foundData.valid;

    const stubData = {
      id: '7',
      title: inputData.title,
      createdAt: '2022-11-09T12:40:46.128Z',
      updatedAt: '2022-11-09T12:40:46.128Z',
    };

    let status; let json; let res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should create category successfully', async () => {
      const req = {
        body: inputData,
      };

      const stubFindOne = sandbox.stub(Category, 'findOne').resolves(foundDataNone);
      const stubCreate = sandbox.stub(Category, 'create').resolves(stubData);

      await addCategoryCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Category added successful');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const inputData = { ...addCategoryData.bodyData.valid };
    const foundData = { ...addCategoryData.foundData.invalid };

    let status; let json; let res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should not add category successfully when category is found with same title', async () => {
      const req = {
        body: inputData,
      };

      const stubFind = sandbox.stub(Category, 'findOne').resolves(foundData);

      await addCategoryCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Category has already been added. Try another');
    });
  });
});
