const express = require('express');
const routes = express.Router();
const bookController = require('../controllers/index');
const validation = require('../middlewear/validate');
const { requiresAuth } = require("express-openid-connect");

routes.get('/', bookController.getAll);
routes.get('/:id', bookController.getOne);

routes.post('/', requiresAuth(), validation.saveBook, bookController.createBook);
routes.put('/:id', requiresAuth(), validation.saveBook, bookController.updateBook);
routes.delete('/:id', requiresAuth(), bookController.deleteBook);

module.exports = routes;