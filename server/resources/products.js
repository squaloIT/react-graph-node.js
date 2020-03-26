const jwt = require("jsonwebtoken");
const { pool } = require('./../utils/db');
const mysql = require('mysql')

const decodeTokenAndReturnInfo = (req) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    return jwt.decode(token);
  } else {
    throw new Error();
  }
}

const productsAll = async (req, res) => {
  const jwtDecoded = decodeTokenAndReturnInfo(req)
  console.log(jwtDecoded)

  if (jwtDecoded && jwtDecoded.id) {
    try {
      pool.query(
        `SELECT p.id, p.product_code, p.description, p.product_name, p.standard_cost, p.list_price, p.category, s.company from products p INNER JOIN suppliers s ON p.supplier_ids = s.id`,
        async function (error, results, fields) {
          if (error) throw error;
          console.log("stigao req")
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

const addProduct = async (req, res) => {
  const { product_id: productId, user_id: userId } = req.body;

  try {
    var jwtDecoded = decodeTokenAndReturnInfo(req);

  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Send authorization token" });
  }
  console.log(jwtDecoded)
  if (jwtDecoded && jwtDecoded.id) {
    try {
      var sql = "INSERT INTO shopping_cart (product_id, user_id) VALUES (?, ?)";
      var inserts = [productId, userId];
      sql = mysql.format(sql, inserts);

      pool.query(sql, function (error, results, fields) {
        if (error)
          throw error;

        console.log(results);
        res.status(200);
      }
      );
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  } else {
    res.status(401).json({ errorMessage: "You have to be authorized to view this content" })
  }
}

module.exports = { productsAll, addProduct };