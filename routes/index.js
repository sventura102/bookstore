const express = require('express');
const routes = express.Router();
const bookController = require('../controllers/index');

routes.get('/', bookController.getAll);
routes.get('/:id', bookController.getOne);

routes.post('/', bookController.createBook);
routes.put('/:id', bookController.updateBook);
routes.delete('/:id', bookController.deleteBook);

module.exports = routes;