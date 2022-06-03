const handlers = require('./handlers');

const routes = [
	{
		path: '/books',
		method: 'POST',
		handler: handlers.handleAddBook,
	},
	{
		path: '/books',
		method: 'GET',
		handler: handlers.handleGetBooks,
	},
	{
		path: '/books/{id}',
		method: 'GET',
		handler: handlers.handleGetBookDetail,
	},
	{
		path: '/books/{id}',
		method: 'PUT',
		handler: handlers.handleUpdateBook,
	},
	{
		path: '/books/{id}',
		method: 'DELETE',
		handler: handlers.handleDeleteBook,
	},
];

module.exports = routes;
