const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const express = require("express");

const login = require("./utils/auth").login;
const { productsAll, addProduct } = require("./resources/products");
// import { connect } from './utils/db'
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use((req, res, next) => {
    console.log("SVAKI REQUEST");
    next();
});

app.post("/user/login", login);
app.get("/products", productsAll);
app.post("/products/add", addProduct);

const start = async () => {
    app.listen(config.port, () => {
        console.log(`REST API on http://localhost:${config.port}/`);
    });
};

start();
