const jwt = require("jsonwebtoken");
const { pool, connection } = require('./db');

const decodeTokenAndReturnInfo = (req) => {
  if (req.headers.Authorization) {
    req.headers.authorization = req.headers.Authorization
  }
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      return jwt.decode(token);
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log(e);
  }
}

const getProductsAndEmitt = (connection, io) => {
  connection.query("SELECT p.id, p.product_code, p.description, p.product_name, p.standard_cost, p.list_price, p.category, s.company from products p INNER JOIN suppliers s ON p.supplier_ids = s.id WHERE NOT EXISTS (SELECT * FROM shopping_cart WHERE product_id = p.id)", function (error, results, fields) {
    if (error)
      throw error;

    io.sockets.emit('products_changed', results);
  })
}

const getUserCartAndEmitt = (connection, userId, email, io) => {
  connection.query("SELECT sc.id, p.id AS productId, p.product_code, p.product_name, p.standard_cost, u.email FROM shopping_cart sc INNER JOIN user u ON u.id = sc.user_id INNER JOIN products p ON p.id = sc.product_id WHERE u.id = " + connection.escape(userId), function (error, results, fields) {
    if (error)
      throw error;

    io.emit('cart_changed_' + email, results);//in(email). io.sockets
  })
}

module.exports = { decodeTokenAndReturnInfo, getProductsAndEmitt, getUserCartAndEmitt };