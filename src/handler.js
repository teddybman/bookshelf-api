/* eslint-disable linebreak-style */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const books = require('./books');

/* Adding New Book Handler */
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  // eslint-disable-next-line no-unneeded-ternary
  const finished = readPage === pageCount ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};
/* End of Add Books Handler */

/* Get All Books Handler */
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined || reading !== undefined || finished !== undefined) {
    /* Check whether query by name is set */
    if (name !== undefined) {
      const newBook = books.filter((book) => {
        return book.name.toUpperCase().includes(name.toUpperCase());
      });

      if (newBook.length > 0) {
        const queryBook = newBook.map((b) => {
          return {
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          };
        });

        const response = h.response({
          status: 'success',
          data: {
            books: queryBook,
          },
        });
        response.code(200);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    /* Check whether query by reading flag is set */
    if (reading !== undefined) {
      const flagRead = reading === '1' ? true : false;

      const newBook = books.filter((book) => book.reading === flagRead);

      if (newBook.length > 0) {
        const queryBook = newBook.map((b) => {
          return {
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          };
        });

        const response = h.response({
          status: 'success',
          data: {
            books: queryBook,
          },
        });
        response.code(200);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    /* Check whether query by finished flag is set */
    if (finished !== undefined) {
      const flagFinish = finished === '1' ? true : false;

      const newBook = books.filter((book) => book.finished === flagFinish);

      if (newBook.length > 0) {
        const queryBook = newBook.map((b) => {
          return {
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          };
        });

        const response = h.response({
          status: 'success',
          data: {
            books: queryBook,
          },
        });
        response.code(200);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};
/* End of Get All Books Handler */

/* Get detail Book by Id */
const getDetailBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
/* End of Get Detail Handler */

/* Edit Books Handler */
const editBooksHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

/* Delete Books Handler */
const deleteBooksHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getDetailBookByIdHandler,
  editBooksHandler,
  deleteBooksHandler,
};
