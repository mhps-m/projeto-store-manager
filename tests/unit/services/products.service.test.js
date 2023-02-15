const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models'); 
const {
  productMock,
  newProductMock,
  updatedProductMock,
} = require('./mocks/products.service.mock');

use(chaiAsPromised);

describe('Testes de unidade do service de produtos', function () {
  describe('Listagem de todos os produtos', function () {
    it('Recupera a lista de todos os produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves([productMock]);

      const result = await productsService.findAll();

      expect(result).to.deep.equal([productMock]);
    });

    it('Recupera uma lista de produtos vazia', async function () {
      sinon.stub(productsModel, 'findAll').resolves([]);

      await expect(productsService.findAll())
        .to.eventually.be.rejectedWith('No products found')
        .with.property('statusCode', 404);
    });
  });

  describe('Recupera produto pelo seu id', function () {
    it('Recupera o produto', async function () {
      sinon.stub(productsModel, 'findById').resolves(productMock);

      const result = await productsService.findById(1);

      expect(result).to.deep.equal(productMock);
    });

    it('Não encontra o produto', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      await expect(productsService.findById(4))
        .to.eventually.be.rejectedWith('Product not found')
        .with.property('statusCode', 404);
    });
  });

  describe('Insere um novo produto', function () {
    it('Insere o produto com sucesso', async function () {
      sinon.stub(productsModel, 'insert').resolves(4);
      sinon.stub(productsModel, 'findById').resolves(newProductMock);

      const result = await productsService.insert('Pelúcia Alvis Xenoblade');

      expect(result).to.deep.equal(newProductMock);
    });

    describe('Retorna um erro ao tentar inserir um produto com parâmetros incorretos', function () {
      it('Erro ao tentar inserir um produto sem nome', async function () {
        await expect(productsService.insert())
          .to.eventually.be.rejectedWith('"name" is required')
          .with.property('statusCode', 400);
      });

      it('Erro ao tentar inserir um produto com nome menor que 5 caracteres', async function () {
        await expect(productsService.insert('nome'))
          .to.eventually.be.rejectedWith('"name" length must be at least 5 characters long')
          .with.property('statusCode', 422);
      });
    });
  });

  describe('Atualiza um produto', function () {
    it('Atualiza o produto com sucesso', async function () {
      sinon.stub(productsModel, 'update').resolves([{ affectedRows: 1 }]);
      sinon.stub(productsModel, 'findById').resolves(updatedProductMock);

      const result = await productsService.update('Pelúcia Zanza Xenoblade', 1);

      expect(result).to.deep.equal(updatedProductMock);
    });

    describe('Testa erros ao tentar atualizar um produto', function () {
      it('Erro ao tentar atualizar um produto sem nome', async function () {
        await expect(productsService.update(undefined, 1))
          .to.eventually.be.rejectedWith('"name" is required')
          .with.property('statusCode', 400);
      });

      it('Erro ao tentar atualizar um produto com nome menor que 5 caracteres', async function () {
        await expect(productsService.update('name', 1))
          .to.eventually.be.rejectedWith('"name" length must be at least 5 characters long')
          .with.property('statusCode', 422);
      });

      it('Erro ao tentar atualizar um produto inexistente', async function () {
        sinon.stub(productsModel, 'findById').resolves(undefined);

        await expect(productsService.update('newName', 4))
          .to.eventually.be.rejectedWith('Product not found')
          .with.property('statusCode', 404);
      });
    });
  });

  describe('Remove um produto', function () {
    it('Remove um produto com sucesso', async function () {
      sinon.stub(productsModel, 'findById').resolves(productMock);
      sinon.stub(productsModel, 'remove').resolves(true);

      await expect(productsService.remove(1))
        .not.to.eventually.be.rejected;
    });

    it('Erro ao tentar remover um produto inexistente', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      await expect(productsService.remove(4))
        .to.eventually.be.rejectedWith('Product not found')
        .with.property('statusCode', 404);
    });
  });

  afterEach(sinon.restore);
});