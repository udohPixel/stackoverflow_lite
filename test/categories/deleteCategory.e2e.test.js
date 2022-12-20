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
const deleteData = require('./deleteCategory.data.mock.json');
const Category = require('../../categories/models/Category');
const deleteCategoryCtrl = require('../../categories/controllers/deleteCategory.controller');

// delete category test
describe('DELETE CATEGORY E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const paramsData = { ...deleteData.paramsData.valid };
    const foundData = { ...deleteData.foundData.valid };

    const stubData = {
      id: foundData.id,
      title: foundData.title,
      createdAt: foundData.createdAt,
      updatedAt: foundData.updatedAt,
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

    it('should delete a category successfully', async () => {
      const req = {
        params: paramsData,
      };

      const stubFind = sandbox.stub(Category, 'findOne').resolves(foundData);
      const stubDelete = sandbox.stub(Category, 'destroy').resolves(stubData);

      await deleteCategoryCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Category deleted successfully');
    });
  });

  describe('NEGATIVE TEST', () => {
    const paramsData = { ...deleteData.paramsData.invalid };
    const foundDataNone = deleteData.foundData.invalid;

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

    it('should not delete a category successfully when category is not found by id', async () => {
      const req = {
        params: paramsData,
      };

      const stubFind = sandbox.stub(Category, 'findOne').resolves(foundDataNone);

      await deleteCategoryCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal('Category does not exist');
    });
  });
});
