const newSaleMock = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 3,
    },
    {
      productId: 2,
      quantity: 1,
    },
  ],
};

const allSalesMock = [
  {
    saleId: 1,
    date: 'data',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: 'data',
    productId: 2,
    quantity: 1,
  },
  {
    saleId: 1,
    date: 'data',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 2,
    date: 'data',
    productId: 3,
    quantity: 3,
  },
];

const saleByIdMock = [
  {
    date: 'data',
    productId: 1,
    quantity: 2,
  },
  {
    date: 'data',
    productId: 2,
    quantity: 1,
  },
];

const updatedSaleMock = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 3,
    },
    {
      productId: 3,
      quantity: 4,
    },
  ],
};

module.exports = {
  newSaleMock,
  allSalesMock,
  saleByIdMock,
  updatedSaleMock,
};