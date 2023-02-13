const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productMock } = require('./mocks/products.service.mock');

use(chaiAsPromised);

describe('Testes de unidade do service de produtos', function () {
  describe('Listagem de todos os produtos', function () {
    it('Recupera a lista de todos os produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productMock);

      const result = await productsService.findAll();

      expect(result).to.deep.equal(productMock);
    });

    it('Recupera uma lista de produtos vazia', async function () {
      sinon.stub(productsModel, 'findAll').resolves([]);

      await expect(productsService.findAll())
        .to.eventually.be.rejectedWith('No products found')
        .with.property('code', 'NotFound');
    });
  });

  describe('Recupera produto pelo seu id', function () {
    it('Recupera o produto', async function () {
      sinon.stub(productsModel, 'findById').resolves(productMock[0]);

      const result = await productsService.findById();

      expect(result).to.deep.equal(productMock[0]);
    });

    it('Não encontra o produto', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      await expect(productsService.findById())
        .to.eventually.be.rejectedWith('Product not found')
        .with.property('code', 'NotFound');
    });
  });

  afterEach(sinon.restore);
});