const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsListMock, newProductMock, productsMock } = require('./mocks/productsController.mock');

describe('CONTROLLER - Teste unitário da camada Controller', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()
      sinon.stub(productsService, 'getAll').resolves({ type: null, message: productsListMock })

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(productsListMock)
    });
  });

  describe('Buscando um produto', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 }
      };
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()
      sinon.stub(productsService, 'getById').resolves({ type: null, message: newProductMock })

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('ao passar um id inválido retorna um erro', async function () {
      const res = {};
      const req = {
        params: { id: 'asdfeqwe' }
      };
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()
      sinon.stub(productsService, 'getById').resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' })

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({message: '"id" must be a number'});
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 123123 }
      };
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()
      sinon.stub(productsService, 'getById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    });
  });

  describe('Cadastrando um novo produto', function () {
    it('ao enviar dados válidos deve salvar com sucesso', async function () {
      const res = {}
      const req = {
        body: productsMock
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'createProduct').resolves({ type: null, message: newProductMock })

      await productsController.createProduct(req, res)

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('ao enviar um nome com menos de 2 caracteres deve retornar um erro', async function () {
      const res = {}
      const req = {
        body: {
          name: 'Play'
        }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 2 characters long' })

      await productsController.createProduct(req, res)

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({message: '"name" length must be at least 2 characters long'});
    });
  });

  describe('Atualizando um produto', function () {
    it('ao enviar dados válidos deve atualizar com sucesso', async function () {
      const res = {}
      const req = {
        params: { id: 1 },
        body: productsMock
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateProduct').resolves({ type: null, message: newProductMock })

      await productsController.updateProduct(req, res)

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('ao enviar um nome com menos de 2 caracteres deve retornar um erro', async function () {
      const res = {}
      const req = {
        params: { id: 1 },
        body: {
          name: 'Play'
        }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 2 characters long' })

      await productsController.updateProduct(req, res)

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({message: '"name" length must be at least 2 characters long'});
    });
  })
  
  describe('Deletando um produto', function () {
    it('ao enviar um id válido deve deletar com sucesso', async function () {
      const res = {}
      const req = {
        params: { id: 1 }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'deleteProduct').resolves({ type: null })

      await productsController.deleteProduct(req, res)

      expect(res.status).to.have.been.calledWith(204);
    });

    it('ao enviar um id inválido deve retornar um erro', async function () {
      const res = {}
      const req = {
        params: { id: 'asdasd' }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'deleteProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' })

      await productsController.deleteProduct(req, res)

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('ao enviar um id que não existe no banco deve retornar um erro', async function () {
      const res = {}
      const req = {
        params: { id: 123123 }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'deleteProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

      await productsController.deleteProduct(req, res)

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  this.afterEach(function () {
    sinon.restore()
  })
});
