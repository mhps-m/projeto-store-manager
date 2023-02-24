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
  updatedSaleMock,
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

    it('Erro ao tentar inserir venda sem um array de objetos', async function () {
      await expect(salesService.insert())
        .to.eventually.be.rejectedWith('Body must be an array of objects')
        .with.property('statusCode', 400);
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

  describe('Atualiza uma venda', function () {
    it('Atualiza uma venda com sucesso', async function () {
      sinon.stub(salesProductsModel, 'insert').resolves();
      sinon.stub(salesProductsModel, 'remove').resolves();
      sinon.stub(salesModel, 'findById').resolves(saleByIdMock);
      sinon.stub(productsService, 'findById').resolves({});

      const result = await salesService
        .update(updatedSaleMock.saleId, updatedSaleMock.itemsUpdated);

      expect(result).to.deep.equal(updatedSaleMock);
    });

    it('Erro ao tentar atualizar venda sem id de um dos produtos', async function () {
      await expect(salesService.update(1, noIdMock))
        .to.eventually.be.rejectedWith('"productId" is required')
        .with.property('statusCode', 400);
    });

    it('Erro ao tentar atualizar venda sem a quantidade de um dos produtos', async function () {
      await expect(salesService.update(1, noQuantityMock))
        .to.eventually.be.rejectedWith('"quantity" is required')
        .with.property('statusCode', 400);
    });

    it('Erro ao tentar atualizar venda com a quantidade um produto sendo menor que 1', async function () {
      await expect(salesService.update(1, quantityLessThanOneMock))
        .to.eventually.be.rejectedWith('"quantity" must be greater than or equal to 1')
        .with.property('statusCode', 422);
    });

    it('Erro ao tentar atualizar uma venda inexistente', async function () {
      sinon.stub(productsService, 'findById').resolves();
      sinon.stub(salesModel, 'findById').resolves([]);

      await expect(salesService.update(3, updatedSaleMock.itemsUpdated))
        .to.eventually.be.rejectedWith('Sale not found')
        .with.property('statusCode', 404);
    });

    it('Erro ao tentar atualizar uma venda sem um array de objetos', async function () {
      await expect(salesService.update(1, []))
        .to.eventually.be.rejectedWith('Body must be an array of objects')
        .with.property('statusCode', 400);
    });
  });

  afterEach(sinon.restore);
});