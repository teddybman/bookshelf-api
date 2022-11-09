/* eslint-disable linebreak-style */
const {
  addBookHandler,
  getAllBooksHandler,
  getDetailBookByIdHandler,
  editBooksHandler,
  deleteBooksHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },

  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },

  {
    method: 'GET',
    path: '/books/{id}',
    handler: getDetailBookByIdHandler,
  },

  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooksHandler,
  },

  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooksHandler,
  },
];

module.exports = routes;
