const express = require('express');
const routes = express.Router();
const bookController = require('../controllers/index');
const validation = require('../middlewear/validate');

routes.get('/', bookController.getAll);
routes.get('/:id', bookController.getOne);

routes.post('/', validation.saveBook, bookController.createBook);
routes.put('/:id', validation.saveBook, bookController.updateBook);
routes.delete('/:id', bookController.deleteBook);

module.exports = routes;