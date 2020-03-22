const { merge } = require("lodash");
const env = process.env.NODE_ENV || "development";

const baseConfig = {
    env,
    isDev: env === "development",
    isTest: env === "testing",
    port: 3000,
    db: {
        dbName: "northwind",
        host: 'localhost',
        username: 'root',
        password: '',
    },
    secrets: {
        jwt: process.env.JWT_SECRET || "learneverything",
        jwtExp: "100d"
    }
};

let envConfig = {};

switch (env) {
    case "dev":
    case "development":
        envConfig = require("./dev").config;
        break;
    case "test":
    case "testing":
        envConfig = require("./testing").config;
        break;
    default:
        envConfig = require("./dev").config;
}

module.exports = merge(baseConfig, envConfig);
