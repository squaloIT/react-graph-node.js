const jwt = require("jsonwebtoken");
const { pool } = require('./../utils/db');

const productsAll = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const jwtDecoded = jwt.decode(token);
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
    res.status(401).send("You have to be authorized to view this content");
  }

};

module.exports = { productsAll };