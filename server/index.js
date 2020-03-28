
const config = require("./config");
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var protect = require("./utils/auth").protect;
var restRouter = require("./api");
var setGlobalMiddleware = require('./middleware');

const login = require("./utils/auth").login;
// const { productsAll, addProduct } = require("./resources/products/products");

setGlobalMiddleware(app);
app.use((req, res, next) => {
    req.body.io = io;
    next();
});
app.post("/user/login", login);
app.use('/api', protect, restRouter)

// app.get("/products", productsAll);
// app.post("/products/add", (req, res) => addProduct(req, res, io));

// app.get("/user/cart", userCart);
// app.delete("/user/delete-item/:productId", (req, res) => deleteCartItem(req, res, io));

const start = async () => {
    http.listen(config.port, () => {
        console.log(`REST API on http://localhost:${config.port}/`);
    });
};

start();
