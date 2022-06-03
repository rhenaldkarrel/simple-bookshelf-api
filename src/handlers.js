/* eslint-disable no-extra-boolean-cast */
const { nanoid } = require('nanoid');
const books = require('./books');

module.exports = {
	handleAddBook(request, h) {
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
		const finished = pageCount === readPage;
		const insertedAt = new Date().toISOString();
		const updatedAt = insertedAt;

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

		if (!name) {
			return h
				.response({
					status: 'fail',
					message: 'Gagal menambahkan buku. Mohon isi nama buku',
				})
				.code(400);
		}

		if (readPage > pageCount) {
			return h
				.response({
					status: 'fail',
					message:
						'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
				})
				.code(400);
		}

		books.push(newBook);

		const isSuccess = books.filter((book) => book.id === id).length > 0;
		if (isSuccess) {
			return h
				.response({
					status: 'success',
					message: 'Buku berhasil ditambahkan',
					data: {
						bookId: id,
					},
				})
				.code(201);
		}

		return h
			.response({
				status: 'error',
				message: 'Buku gagal ditambahkan',
			})
			.code(500);
	},

	handleGetBooks(request, h) {
		const { name, finished, reading } = request.query;

		let result = books.map((book) => ({
			id: book.id,
			name: book.name,
			publisher: book.publisher,
		}));

		if (name) {
			result = books
				.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
				.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				}));
		}

		if (finished) {
			result = books
				.filter((book) => book.finished === !!Number(finished))
				.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				}));
		}

		if (reading) {
			result = books
				.filter((book) => book.reading === !!Number(reading))
				.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				}));
		}

		if (books.length > 0) {
			return h
				.response({
					status: 'success',
					data: {
						books: result,
					},
				})
				.code(200);
		}

		return h.response({
			status: 'success',
			data: {
				books: [],
			},
		});
	},

	handleGetBookDetail(request, h) {
		const { id } = request.params;
		const book = books.filter((b) => b.id === id)[0];

		if (book !== undefined) {
			return h
				.response({
					status: 'success',
					data: {
						book,
					},
				})
				.code(200);
		}

		return h
			.response({
				status: 'fail',
				message: 'Buku tidak ditemukan',
			})
			.code(404);
	},

	handleUpdateBook(request, h) {
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

		const finished = pageCount === readPage;
		const updatedAt = new Date().toISOString();

		if (!name) {
			return h
				.response({
					status: 'fail',
					message: 'Gagal memperbarui buku. Mohon isi nama buku',
				})
				.code(400);
		}

		if (readPage > pageCount) {
			return h
				.response({
					status: 'fail',
					message:
						'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
				})
				.code(400);
		}

		const book = books.find((b) => b.id === id);

		if (book) {
			book.name = name;
			book.year = year;
			book.author = author;
			book.summary = summary;
			book.publisher = publisher;
			book.pageCount = pageCount;
			book.readPage = readPage;
			book.reading = reading;
			book.finished = finished;
			book.updatedAt = updatedAt;

			return h
				.response({
					status: 'success',
					message: 'Buku berhasil diperbarui',
				})
				.code(200);
		}

		return h
			.response({
				status: 'fail',
				message: 'Gagal memperbarui buku. Id tidak ditemukan',
			})
			.code(404);
	},

	handleDeleteBook(request, h) {
		const { id } = request.params;
		const book = books.find((b) => b.id === id);

		if (book) {
			books.splice(books.indexOf(book), 1);

			return h
				.response({
					status: 'success',
					message: 'Buku berhasil dihapus',
				})
				.code(200);
		}

		return h
			.response({
				status: 'fail',
				message: 'Buku gagal dihapus. Id tidak ditemukan',
			})
			.code(404);
	},
};
