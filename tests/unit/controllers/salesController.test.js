const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesProductsMock, insertId, invalidSaleProductMock, salesListMock, saleIdMock } = require('./mocks/salesController.mock');

describe('CONTROLLER - Teste unitário da camada Controller - SALES', function () {
  describe('Cadastrando uma nova venda', function () {
    it('ao enviar dados válidos deve salvar com sucesso', async function () {
      const res = {}
      const req = {
        body: salesProductsMock
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSale').resolves({ type: null, message: { id: insertId, itemsSold: salesProductsMock } })
      
      await salesController.createSaleProduct(req, res)

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: insertId, itemsSold: salesProductsMock });
    });

    it('ao enviar dados válidos deve salvar com sucesso', async function () {
      const res = {}
      const req = {
        body: invalidSaleProductMock
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSale').resolves({ type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' })

      await salesController.createSaleProduct(req, res)

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
    
    describe('Listando vendas', function () {
      it('deve retornar o status 200 e a lista de vendas', async function () {
        const res = {}
        const req = {}
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns()
        sinon.stub(salesService, 'getAllSales')
          .resolves({ type: null, message: salesListMock })
        
        await salesController.listSales(req, res);

        expect(res.status).to.have.been.calledWith(200)
        expect(res.json).to.have.been.calledWith(salesListMock)
      })

      it('ao passar um id inválido retorna um erro', async function () {
        const res = {};
        const req = {
          params: { id: 'abc' }
        };
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns()
        sinon.stub(salesService, 'getSaleById').resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' })

        await salesController.getSale(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
      });

      it('ao passar o id de uma venda que não existe no banco deve retornar um erro', async function () {
        const res = {};
        const req = {
          params: { id: 123123 }
        };
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns()
        sinon.stub(salesService, 'getSaleById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' })

        await salesController.getSale(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
      });

      it('deve responder com 200 e os dados das vendas quando existir', async function () {
        const res = {};
        const req = {
          params: { id: 1 }
        };
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns()
        sinon.stub(salesService, 'getSaleById').resolves({ type: null, message: saleIdMock })

        await salesController.getSale(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(saleIdMock);
      });
    })
  });

  this.afterEach(function () {
    sinon.restore()
  })
});