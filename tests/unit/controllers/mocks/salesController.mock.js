const salesProductsMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const invalidSaleProductMock = [
  {
    "productId": 1,
    "quantity": -2
  }
]

const insertId = 1

const salesListMock = [
  {
    saleId: 1,
    date: "2023 - 04 - 28T20: 35: 00.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 2,
    date: "2023 - 04 - 28T20: 35: 00.000Z",
    productId: 1,
    quantity: 3
  },
];

const saleIdMock = [
  { date: "2023 - 04 - 28T22: 32: 17.000Z", productId: 1, quantity: 2 },
  { date: "2023 - 04 - 28T22: 32: 17.000Z", productId: 2, quantity: 3 }
]

module.exports = {
  salesProductsMock,
  insertId,
  invalidSaleProductMock,
  salesListMock,
  saleIdMock,
};