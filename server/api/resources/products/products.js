const { pool } = require('./../../../utils/db');
const mysql = require('mysql')
const decodeTokenAndReturnInfo = require('./../../../utils/helper-functions').decodeTokenAndReturnInfo
const getProductsAndEmitt = require('./../../../utils/helper-functions').getProductsAndEmitt
const getUserCartAndEmitt = require('./../../../utils/helper-functions').getUserCartAndEmitt

const productsAll = async (req, res) => {
  const jwtDecoded = decodeTokenAndReturnInfo(req)
  if (jwtDecoded && jwtDecoded.id) {
    try {
      pool.query(
        `SELECT p.id, p.product_code, p.description, p.product_name, p.standard_cost, p.list_price, p.category, s.company from products p INNER JOIN suppliers s ON p.supplier_ids = s.id WHERE NOT EXISTS (SELECT * FROM shopping_cart WHERE product_id = p.id)`,
        function (error, results, fields) {
          if (error) throw error;

          var products = [
            ...results
          ]

          if (!products.length) {
            res.status(204).send();
            return;
          }

          res.status(200).json({ products });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  } else {
    res.status(401).json({ errorMessage: "You have to be authorized to view this content" });
  }

};

const addProduct = async (req, res, io) => {
  const { product_id: productId, user_id: userId } = req.body;

  try {
    var jwtDecoded = decodeTokenAndReturnInfo(req);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Send authorization token" });
  }

  if (jwtDecoded && jwtDecoded.id) {
    try {
      var sql = "INSERT INTO shopping_cart (product_id, user_id) VALUES (?, ?)";
      var inserts = [productId, userId];
      sql = mysql.format(sql, inserts);

      pool.getConnection((err, connection) => {
        connection.query(sql, function (error, results, fields) {
          if (error)
            throw error;

          getProductsAndEmitt(connection, req.body.io)
          getUserCartAndEmitt(connection, jwtDecoded.id, jwtDecoded.email, req.body.io)
          res.status(200).send();
          connection.release() //OVde moguc bug ako su izvrsavanje query-a asinhroni a jesu
        });
      })
      res.status(200).send();

    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
    res.status(200).send();
  } else {
    res.status(401).json({ errorMessage: "You have to be authorized to view this content" })
  }
  res.status(500).send();

}

module.exports = { productsAll, addProduct };