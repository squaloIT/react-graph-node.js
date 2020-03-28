var express = require('express');
var { addProduct, productsAll } = require('./products')
var productsRouter = express.Router();

productsRouter.route('/')
  .get(productsAll)
productsRouter.route('/add')
  .post(addProduct)

module.exports = productsRouter;