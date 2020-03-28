var express = require('express');
var userRouter = require('./resources/user/user.restRouter');
var productsRouter = require('./resources/products/products.restRouter');
var express = require('express');

const restRouter = express.Router()

restRouter.use('/user', userRouter)
restRouter.use('/products', productsRouter)

module.exports = restRouter;