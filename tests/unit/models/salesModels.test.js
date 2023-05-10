const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { productSaleMock, insertId, allSaleMock, allSaleMockConnection, saleIdMock, saleIdMockConnection} = require('./mocks/sales.mock')

describe('MODEL - Teste de unidade da camada model', function () {
  it('Testando a função insertSale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 12 }])
    const result = await salesModel.insertSale()
    expect(result).to.equal(12)
  });

  it('retorna o valor affectedRows = 1', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
    const result = await salesModel.insertSaleProduct(insertId, productSaleMock)
    expect(result).to.equal(1)
  })

  it('retorna lista com todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSaleMockConnection])
    const result = await salesModel.getAllSales()
    expect(result).to.be.deep.equal(allSaleMock)
  })

  it('retorna lista de uma venda especifica', async function () {
    sinon.stub(connection, 'execute').resolves([saleIdMockConnection])
    const result = await salesModel.getSaleById(1)
    expect(result).to.be.deep.equal(saleIdMock)
  })

  afterEach(function () {
    sinon.restore();
  })
});
