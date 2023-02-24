const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  newSaleMock,
  allSalesMock,
  saleByIdMock,
  updatedSaleMock,
} = require('./mocks/sales.controller.mock');

use(sinonChai);

describe('Testa a camada controller de vendas', function () {
  it('Insere uma venda', async function () {
    const req = {
      body: newSaleMock.itemsSold,
    };

    const res = { status: '', json: '' };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'insert').resolves(newSaleMock);

    await salesController.insert(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSaleMock);
  });

  it('Recupera todas as vendas', async function () {
    const req = {};

    const res = { status: '', json: '' };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findAll').resolves(allSalesMock);

    await salesController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesMock);
  });

  it('Recupera uma venda com id igual ao passado como parâmetro', async function () {
    const req = {
      params: {
        id: 1,
      },
    };

    const res = { status: '', json: '' };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findById').resolves(saleByIdMock);

    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleByIdMock);
  });

  it('Deleta uma venda com id igual ao passado como parâmetro', async function () {
    const req = {
      params: {
        id: 1,
      },
    };

    const res = { status: '', json: '' };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'remove').resolves(saleByIdMock); 

    await salesController.remove(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  it('Atualiza uma venda', async function () {
    const req = {
      body: updatedSaleMock.itemsSold,
      params: {
        id: updatedSaleMock.saleId,
      },
    };

    const res = { status: '', json: '' };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'update').resolves(updatedSaleMock);

    await salesController.update(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedSaleMock);
  });

  afterEach(sinon.restore);
});