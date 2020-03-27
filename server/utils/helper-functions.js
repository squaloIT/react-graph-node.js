const jwt = require("jsonwebtoken");
const { pool } = require('./db');

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

const getProductsAndEmitt = (io) => {
  pool.query("SELECT p.id, p.product_code, p.description, p.product_name, p.standard_cost, p.list_price, p.category, s.company from products p INNER JOIN suppliers s ON p.supplier_ids = s.id WHERE NOT EXISTS (SELECT * FROM shopping_cart WHERE product_id = p.id)", function (error, results, fields) {
    if (error)
      throw error;

    io.sockets.emit('products_changed', results);
  })
}
module.exports = { decodeTokenAndReturnInfo, getProductsAndEmitt };