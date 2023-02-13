const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const productsMock = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const result = await productsModel.findAll();
    expect(result).to.deep.equal(productsMock);
  });

  it('Recuperando um produto pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const result = await productsModel.findById(1);

    expect(result).to.deep.equal(productsMock[0]);
  });

  afterEach(sinon.restore);
});