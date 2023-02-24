const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { salesService, productsService } = require('../../../src/services');
const { salesModel, salesProductsModel } = require('../../../src/models'); 

const {
  newSaleMock,
  noIdMock,
  noQuantityMock,
  quantityLessThanOneMock,
  allSalesMock,
  saleByIdMock,
} = require('./mocks/sales.service.mock');

use(chaiAsPromised);

describe('Testa camada service de vendas', function () {
  describe('Insere uma nova venda', function () {
    it('Insere uma nova venda com sucesso', async function () {
      sinon.stub(salesModel, 'insert').resolves(newSaleMock.id);
      sinon.stub(salesProductsModel, 'insert').resolves();
      sinon.stub(productsService, 'findById').resolves({});

      const result = await salesService.insert(newSaleMock.itemsSold);

      expect(result).to.deep.equal(newSaleMock);
    });

    it('Erro ao tentar inserir venda sem id de um dos produtos', async function () {
      await expect(salesService.insert(noIdMock))
        .to.eventually.be.rejectedWith('"productId" is required')
        .with.property('statusCode', 400);
    });

    it('Erro ao tentar inserir venda sem a quantidade de um dos produtos', async function () {
      await expect(salesService.insert(noQuantityMock))
        .to.eventually.be.rejectedWith('"quantity" is required')
        .with.property('statusCode', 400);
    });

    it('Erro ao tentar inserir venda com a quantidade um produto sendo menor que 1', async function () {
      await expect(salesService.insert(quantityLessThanOneMock))
        .to.eventually.be.rejectedWith('"quantity" must be greater than or equal to 1')
        .with.property('statusCode', 422);
    });
  });

  describe('Recupera todas as vendas', function () {
    it('Recupera todas as vendas com sucesso', async function () {
      sinon.stub(salesModel, 'findAll').resolves(allSalesMock);

      const result = await salesService.findAll();

      expect(result).to.deep.equal(allSalesMock);
    });

    it('Erro ao não encontrar nenhuma venda', async function () {
      sinon.stub(salesModel, 'findAll').resolves([]);

      await expect(salesService.findAll())
        .to.eventually.be.rejectedWith('No sales found')
        .with.property('statusCode', 404);
    });
  });

  describe('Recupera uma venda específica pelo seu id', function () {
    it('Recupera a venda com sucesso', async function () {
      sinon.stub(salesModel, 'findById').resolves(saleByIdMock);

      const result = await salesService.findById(1);

      expect(result).to.deep.equal(saleByIdMock);
    });

    it('Erro ao não encontrar uma venda com o id passado', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      await expect(salesService.findById(3))
        .to.eventually.be.rejectedWith('Sale not found')
        .with.property('statusCode', 404);
    });
  });

  describe('Deleta uma venda pelo seu id', function () {
    it('Deleta uma venda com sucesso', async function () {
      sinon.stub(salesModel, 'findById').resolves(saleByIdMock);
      sinon.stub(salesModel, 'remove').resolves([{ affectedRows: 1 }]);

      await expect(salesService.remove(1))
        .not.to.eventually.be.rejected;
    });

    it('Erro ao tentar deletar uma venda inexistente', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      await expect(salesService.remove(3))
        .to.eventually.be.rejectedWith('Sale not found')
        .with.property('statusCode', 404);
    });
  });

  afterEach(sinon.restore);
});