const insertIdMock = 4;

const allSalesMock = [
  {
    saleId: 1,
    date: '2023-02-15T17:12:46.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-02-15T17:12:46.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleByIdMock = [
  {
    date: '2023-02-15T17:12:46.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    date: '2023-02-15T17:12:46.000Z',
    productId: 1,
    quantity: 3,
  },
];

module.exports = {
  insertIdMock,
  allSalesMock,
  saleByIdMock,
};