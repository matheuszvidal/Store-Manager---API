const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mocks/products.mock');

describe('MODEL - Testes de unidade do model de products', function () {
  it('recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(products);
  });

  it('recuperando um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productsModel.getById(1);
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 88 }]);
    const result = await productsModel.insert(newProduct);
    expect(result).to.equal(88);
  });

  it('Atualizando um produto pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
    const result = await productsModel.updateProduct(1, 'Martelo do thor')
    expect(result).to.equal(1)
  })

  it('Deletando um produto pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
    const result = await productsModel.deleteProduct(1)
    expect(result).to.equal(1)
  })

  afterEach(function () {
    sinon.restore();
  })
});
