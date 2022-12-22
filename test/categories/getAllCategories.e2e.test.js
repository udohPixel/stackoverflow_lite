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
const userData = require('./getAllCategories.data.mock.json');
const Category = require('../../categories/models/Category');
const getAllCategoriesCtrl = require('../../categories/controllers/getAllCategories.controller');

// get all categories test
describe('GET ALL CATEGORIES E2E TEST', () => {
  describe('POSITIVE TEST', () => {
    const foundData = { ...userData.foundData.valid };

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

    it('should get all categories successfully', async () => {
      const req = {};

      const stubFind = sandbox.stub(Category, 'findAll').resolves(foundData);

      await getAllCategoriesCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal('Categories found successfully');
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });
});
