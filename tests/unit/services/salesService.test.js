const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { invalidProductSaleMock, productSaleMock, invalidProductIdMock, invalidQuantityMock, invalidQuantitySaleMock, saleIdMock, allSaleMock } = require('./mocks/salesService.mock');

describe('SERVICE - Verificando camada Service de sales', function () {
  describe('Testando erros em createSale', function () {
    it('testa se ao enviar um produto com id de um produto que não exista retorne NOT FOUND', async function () {
      const result = await salesService.createSale(invalidProductSaleMock)

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND')
      expect(result.message).to.be.equal('Product not found')
    })

    it('testa se não enviar a chave productId retorna erro', async function () {
      const result = await salesService.createSale(invalidProductIdMock)

      expect(result.type).to.be.equal('FIELD_INVALID')
      expect(result.message).to.be.equal('"productId" is required')
    })

    it('testa se não enviar a chave quantity retorna erro', async function () {
      const result = await salesService.createSale(invalidQuantityMock)

      expect(result.type).to.be.equal('FIELD_INVALID')
      expect(result.message).to.be.equal('"quantity" is required')
    })

    it('testa se não enviar a chave quantity retorna erro', async function () {
      const result = await salesService.createSale(invalidQuantitySaleMock)

      expect(result.type).to.be.equal('INVALID_VALUE')
      expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1')
    })
  });

  describe('Cadastrando venda no banco de dados', function () {
    it('retorna mensagem contendo a venda', async function () {
      const insertId = 1
      sinon.stub(salesModel, 'insertSale').resolves(insertId)
      
      const result = await salesService.createSale(productSaleMock)
      expect(result.type).to.equal(null)
      expect(result.message).to.deep.equal({ id: insertId, itemsSold: productSaleMock})
    })
  })

  describe('Listando as vendas', function () {
    it('retorna a lista completa de vendas', async function () {
      sinon.stub(salesModel, 'getAllSales').resolves(allSaleMock)

      const result = await salesService.getAllSales()

      expect(result.type).to.equal(null)
      expect(result.message).to.deep.equal(allSaleMock)
    })

    it('retorna a lista de uma venda especificada no ID', async function () {
      sinon.stub(salesModel, 'getSaleById').resolves(saleIdMock)

      const result = await salesService.getSaleById(1)

      expect(result.type).to.equal(null)
      expect(result.message).to.deep.equal(saleIdMock)
    })

    it('retorna um erro caso receba um ID inválido', async function () {
      const result = await salesService.getSaleById('abc');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    })

    it('retorna um erro caso a venda não exista', async function () {
      sinon.stub(salesModel, 'getSaleById').resolves([]);

      const result = await salesService.getSaleById(1);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    })
  })

  afterEach(function () {
    sinon.restore();
  });
});