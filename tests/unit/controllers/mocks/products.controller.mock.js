const productsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const noProductsErrorMock = {
  code: 'NotFound',
  message: 'No products found',
};

const noProductWithIdErrorMock = {
  code: 'NotFound',
  message: 'Product not found',
};

module.exports = {
  productsMock,
  noProductsErrorMock,
  noProductWithIdErrorMock,
};