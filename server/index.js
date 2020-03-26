const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { pool } = require('./utils/db');

const login = require("./utils/auth").login;
const { productsAll, addProductSOCKET } = require("./resources/products");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use((req, res, next) => {
    next();
});

app.post("/user/login", login);
app.get("/products", productsAll);
// app.post("/products/add", addProduct);

io.on("connection", socket => {
    socket.emit("products_changed")//{ products: results });
    socket.on('addProduct', (data) => {
        addProductSOCKET(data)
        pool.query("SELECT p.id, p.product_code, p.description, p.product_name, p.standard_cost, p.list_price, p.category, s.company from products p INNER JOIN suppliers s ON p.supplier_ids = s.id WHERE NOT EXISTS (SELECT * FROM shopping_cart WHERE product_id = p.id)", function (error, results, fields) {
            if (error)
                throw error;

            console.log(socket)
            console.log(results)
            socket.emit("products_changed", { products: results });
        })
    });
    socket.on("disconnect", () => console.log("Client disconnected"))
});

const start = async () => {
    http.listen(config.port, () => {
        console.log(`REST API on http://localhost:${config.port}/`);
    });
};

start();
