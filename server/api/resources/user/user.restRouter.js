var express = require('express');
var userRouter = express.Router()
const { userCart, deleteCartItem } = require("./user");

userRouter.route('/cart')
  .get(userCart)

userRouter.route('/delete-item/:productId')
  .delete(deleteCartItem)

module.exports = userRouter;