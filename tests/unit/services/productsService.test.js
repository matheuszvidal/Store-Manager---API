const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { allProducts, invalidValue, validName, validObject } = require('./mocks/productsService.mock');

describe('SERVICE - Verificando camada Service de products', function () {
  describe('listagem de products', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productsModel, 'getAll').resolves(allProducts);
      
      const result = await productsService.getAll();
      
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('Busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      const result = await productsService.getById('a');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      const result = await productsService.getById(1);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    })

    it('retorna o produto caso ID existente', async function () {
      sinon.stub(productsModel, 'getById').resolves(allProducts[0])

      const result = await productsService.getById(1)

      expect(result.type).to.equal(null)
      expect(result.message).to.deep.equal(allProducts[0])
    })
  });

  describe('Cadastrando produto no banco de dados', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      const result = await productsService.createProduct({})

      expect(result.type).to.equal('FIELD_INVALID')
      expect(result.message).to.equal('"name" is required');
    });

    it('retorna um erro ao passar um nome inválido', async function () {
      const result = await productsService.createProduct({name: 'as'})

      expect(result.type).to.equal('INVALID_VALUE')
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });

    it('retorna o ID do produto cadastrado', async function () {
      sinon.stub(productsModel, 'insert').resolves(1)
      sinon.stub(productsModel, 'getById').resolves(allProducts[0])

      const result = await productsService.createProduct(validObject)

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

  describe('Atualizando um produto', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      const result = await productsService.updateProduct(1, 'name')
      
      expect(result.type).to.equal('INVALID_VALUE')
      expect(result.message).to.equal('"value" must be of type object');
    })

    it('retorna um erro NOT FOUND caso o ID sejá de um produto que não exista', async function () {
      const result = await productsService.updateProduct(12, { name: 'Martelo' })
      
      expect(result.type).to.equal('PRODUCT_NOT_FOUND')
      expect(result.message).to.equal('Product not found')
    })

    it('retorna o id e nome do produto atualizado', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves(1)
      sinon.stub(productsModel, 'getById').resolves(allProducts[0])

      const result = await productsService.updateProduct(1, {name: 'Martelo'})

      expect(result.type).to.equal(null)
      expect(result.message).to.equal(allProducts[0])
    })
  })

  describe('Deletando um produto', function () {
    it('retorna um erro ao passar um ID inválido', async function () {
      const result = await productsService.deleteProduct('a')
      expect(result.type).to.equal('INVALID_VALUE')
      expect(result.message).to.equal('"id" must be a number');
    })

    it('retorna um erro NOT FOUND caso o ID sejá de um produto que não exista', async function () {
      const result = await productsService.deleteProduct(12)
      expect(result.type).to.equal('PRODUCT_NOT_FOUND')
      expect(result.message).to.equal('Product not found')
    })

    it('retorna o id do produto deletado', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves(1)
      const result = await productsService.deleteProduct(1)
      expect(result.type).to.equal(null)
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});