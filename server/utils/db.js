var mysql = require('mysql');
var config = require("./../config")

var con = mysql.createConnection({
    host: config.db.host,
    database: config.db.dbName,
    user: config.db.username,
    password: config.db.password
});

var pool = mysql.createPool({
    connectionLimit: 20,
    host: config.db.host,
    database: config.db.dbName,
    user: config.db.username,
    password: config.db.password
});

module.exports = { connection: con, pool }