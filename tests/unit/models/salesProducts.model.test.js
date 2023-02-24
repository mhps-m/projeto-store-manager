const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const saleDetailsMock = require('./mocks/salesProducts.model.mock');

describe('Testes de unidade da camada model de detalhes de vendas', function () {
  it('Insere detalhes de uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const [{ affectedRows }] = await salesProductsModel
      .insert(saleDetailsMock.id, saleDetailsMock.productId, saleDetailsMock.quantity);
    
    expect(affectedRows).to.deep.equal(1);
  });

  it('Remove detalhes de uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const [{ affectedRows }] = await salesProductsModel
      .remove(saleDetailsMock.id);

    expect(affectedRows).to.deep.equal(1);
  });

  afterEach(sinon.restore);
});