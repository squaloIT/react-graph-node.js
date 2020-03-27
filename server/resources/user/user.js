const { pool } = require('./../../utils/db');
const mysql = require('mysql')
const decodeTokenAndReturnInfo = require('./../../utils/helper-functions').decodeTokenAndReturnInfo

const userCart = async (req, res) => {
  console.log(req.headers);
  const jwtDecoded = decodeTokenAndReturnInfo(req)

  if (jwtDecoded && jwtDecoded.id) {
    try {
      var sql = "SELECT sc.id, p.product_code, p.product_name, p.standard_cost, u.email FROM shopping_cart sc INNER JOIN user u ON u.id = sc.user_id INNER JOIN products p ON p.id = sc.product_id WHERE u.id = ?";
      sql = mysql.format(sql, [jwtDecoded.id]);
      console.log(sql)
      pool.query(sql, async function (error, results, fields) {
        if (error) throw error;

        var usersShoppingCart = [
          ...results
        ]
        console.log(usersShoppingCart)

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

module.exports = { userCart }