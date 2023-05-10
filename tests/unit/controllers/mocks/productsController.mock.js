const productsMock = {
  name: 'Escudo do capitão',
};

const newProductMock = { id: 1, ...productsMock };

const productsListMock = [newProductMock];

module.exports = {
  productsListMock,
  newProductMock,
  productsMock,
};