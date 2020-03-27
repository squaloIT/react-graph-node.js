const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const login = require("./utils/auth").login;
const { productsAll, addProduct } = require("./resources/products/products");
const { userCart, deleteCartItem } = require("./resources/user/user");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use((req, res, next) => {
    next();
});

app.post("/user/login", login);
app.get("/products", productsAll);
app.post("/products/add", (req, res) => addProduct(req, res, io));
app.get("/user/cart", userCart);
app.delete("/user/delete-item/:productId", (req, res) => deleteCartItem(req, res, io));

const start = async () => {
    http.listen(config.port, () => {
        console.log(`REST API on http://localhost:${config.port}/`);
    });
};

start();
