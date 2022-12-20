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
const updateData = require('./updateCategory.data.mock.json');
const Category = require('../../categories/models/Category');
const updateCategoryCtrl = require('../../categories/controllers/updateCategory.controller');

// update category test
describe('UPDATE USER E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const inputData = { ...updateData.bodyData.valid.categoryInfo };
    const paramsData = { ...updateData.paramsData.valid };
    const foundData = { ...updateData.foundData.valid };

    const stubData = {
      id: '12',
      title: inputData.title,
      createdAt: '2022-12-11T12:40:46.128Z',
      updatedAt: '2022-12-11T12:40:46.128Z',
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

    it('should update a category successfully', async () => {
      const req = {
        body: inputData,
        params: paramsData,
      };

      const stubFindOne = sandbox.stub(Category, 'findOne').resolves(foundData);
      const stubUpdate = sandbox.stub(Category, 'update').resolves();
      const stubFindId = sandbox.stub(Category, 'findByPk').resolves(stubData);

      await updateCategoryCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(stubFindId.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Category updated successfully');
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe('NEGATIVE TEST', () => {
    const inputData = { ...updateData.bodyData.valid.categoryInfo };
    const paramsData = { ...updateData.paramsData.invalid };
    const foundDataNone = updateData.foundData.invalid;

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

    it('should not update a category successfully when category is not found', async () => {
      const req = {
        body: inputData,
        params: paramsData,
      };

      const stubFindOne = sandbox.stub(Category, 'findOne').resolves(foundDataNone);

      await updateCategoryCtrl(req, res);

      expect(stubFindOne.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Category does not exist');
    });
  });
});
