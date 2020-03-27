const jwt = require("jsonwebtoken");

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

module.exports = { decodeTokenAndReturnInfo };