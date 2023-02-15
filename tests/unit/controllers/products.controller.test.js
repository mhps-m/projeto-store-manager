const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  productsMock,
  newProductMock,
  updatedProductMock,
} = require('./mocks/products.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa camada controller de produtos', function () {
  describe('Listagem de todos os produtos', function () {
    it('Recupera a lista de todos os produtos', async function () {
      const req = {};
      const res = { status: '', json: '' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findAll').resolves(productsMock);

      await productsController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock);
    });
  });

  describe('Recupera produto de acordo com id passado', function () {
    it('Recupera produto com sucesso', async function () {
      const req = { params: { id: 1 } };
      const res = { status: '', json: '' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById').resolves(productsMock[0]);

      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock[0]);
    });
  });

  describe('Insere um novo produto', function () {
    it('Insere um produto com sucesso', async function () {
      const req = {
        body: {
          name: newProductMock.name,
        },
      };
      const res = { status: '', json: '' };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'insert').resolves(newProductMock);

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });
  });

  describe('Atualiza um produto', function () {
    it('Atualiza um produto com sucesso', async function () {
      const req = {
        body: {
          name: 'Abubleba',
        },
        params: {
          id: 1,
        },
      };

      const res = { status: '', json: '' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'update').resolves(updatedProductMock);

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedProductMock);
    });
  });

  describe('Remove um produto', function () {
    it('Remove um produto com sucesso', async function () {
      const req = {
        params: {
          id: 1,
        },
      };

      const res = { status: '', json: '' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'remove').resolves();

      await productsController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });
  });

  afterEach(sinon.restore);
});