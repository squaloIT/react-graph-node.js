const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const setGlobalMiddleware = (app) => {
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan("dev"));
}

module.exports = setGlobalMiddleware; 