const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const {
  insertIdMock,
  allSalesMock,
  saleByIdMock,
} = require('./mocks/sales.model.mock');

describe('Testes de unidade da camada model de vendas', function () {
  it('Fazendo uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: insertIdMock }]);

    const insertId = await salesModel.insert();

    expect(insertId).to.deep.equal(insertIdMock);
  });

  it('Recuperando todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMock]);

    const result = await salesModel.findAll();

    expect(result).to.deep.equal(allSalesMock);
  });

  it('Recuperando uma venda pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves([saleByIdMock]);

    const result = await salesModel.findById(1);

    expect(result).to.deep.equal(saleByIdMock);
  });

  it('Deletando uma venda pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const [{ affectedRows }] = await salesModel.remove(1);

    expect(affectedRows).to.deep.equal(1);
  });

  afterEach(sinon.restore);
});