const insertId = 1
const productSaleMock = { productId: 1, quantity: 1 }

const allSaleMockConnection = [
  {
    sale_id: 1,
    date: "2023 - 04 - 28T20: 35: 00.000Z",
    product_id: 1,
    quantity: 5
  },
  {
    sale_id: 2,
    date: "2023 - 04 - 28T20: 35: 00.000Z",
    product_id: 1,
    quantity: 3
  },
];

const allSaleMock = [
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

const saleIdMockConnection = [
  { date: "2023 - 04 - 28T22: 32: 17.000Z", product_id: 1, quantity: 2 },
  { date: "2023 - 04 - 28T22: 32: 17.000Z", product_id: 2, quantity: 3 }
]

const saleIdMock = [
  { date: "2023 - 04 - 28T22: 32: 17.000Z", productId: 1, quantity: 2 },
  { date: "2023 - 04 - 28T22: 32: 17.000Z", productId: 2, quantity: 3 }
]

module.exports = {
  productSaleMock,
  insertId,
  allSaleMockConnection,
  allSaleMock,
  saleIdMockConnection,
  saleIdMock,
}