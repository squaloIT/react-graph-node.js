const { pool } = require('./../../../utils/db');
const mysql = require('mysql')
const decodeTokenAndReturnInfo = require('./../../../utils/helper-functions').decodeTokenAndReturnInfo
const getProductsAndEmitt = require('./../../../utils/helper-functions').getProductsAndEmitt
const getUserCartAndEmitt = require('./../../../utils/helper-functions').getUserCartAndEmitt

const userCart = async (req, res) => {
  const jwtDecoded = decodeTokenAndReturnInfo(req)

  if (jwtDecoded && jwtDecoded.id) {
    try {
      var sql = "SELECT sc.id, p.id AS productId, p.product_code, p.product_name, p.standard_cost, u.email FROM shopping_cart sc INNER JOIN user u ON u.id = sc.user_id INNER JOIN products p ON p.id = sc.product_id WHERE u.id = ?";
      sql = mysql.format(sql, [jwtDecoded.id]);
      pool.query(sql, async function (error, results, fields) {
        if (error) throw error;

        var usersShoppingCart = [
          ...results
        ]

        if (!usersShoppingCart.length) {
          res.status(204).send();
          return;
        }
        res.status(200).json({ usersShoppingCart });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  } else {
    res.status(401).json({ errorMessage: "You have to be authorized to view this content" });
  }
};

const deleteCartItem = async (req, res) => {
  const jwtDecoded = decodeTokenAndReturnInfo(req)
  var productId = +req.params.productId;

  if (jwtDecoded && jwtDecoded.id) {
    try {
      var sql = "DELETE FROM shopping_cart WHERE user_id=? AND product_id=?";
      sql = mysql.format(sql, [jwtDecoded.id, productId]);
      pool.getConnection((err, connection) => {
        connection.query(sql, function (error, results, fields) {
          if (error) throw error;

          getProductsAndEmitt(connection, req.body.io);
          getUserCartAndEmitt(connection, jwtDecoded.id, jwtDecoded.email, req.body.io);
          res.status(200).json({ message: 'Successfully deleted item' });
        })
      })
        ;
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  } else {
    res.status(401).json({ errorMessage: "You have to be authorized to view this content" });
  }
}

module.exports = { userCart, deleteCartItem }