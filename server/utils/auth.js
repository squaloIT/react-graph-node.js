const jwt = require("jsonwebtoken");
const config = require("./../config/index");
const { connection, pool } = require('./db')
const { bcrypt } = require('bcrypt');

const checkEmail = email => {
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+.[A-Z]{2,}$/gim;
    return regExp.test(email);
};

const checkPass = pass => {
    return pass.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/i);
};

const newToken = user => {
    return jwt.sign({ id: user._id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    });
};

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: "Unesite sifru i email" });
    }

    if (!checkEmail(email)) {
        return res.status(401).json({ message: "Unesite odgovarajuci email" });
    } else if (!checkPass(password)) {
        return res.status(401).json({ message: "Unesite odgovarajucu sifru" });
    }

    try {
        // console.log("user");
        // var user = await User.create({ email, password, username, friends: [] });
        // console.log(user);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }

    const token = newToken(user);

    res.status(200).json({
        message: "User registered",
        user: {
            username: user.username,
            friendsIds: [],
            authData: {
                userId: user._id,
                idToken: token,
                expiresIn: 2000
            }
        }
    });
};

const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!checkEmail(email)) {
        return res.status(401).json({ message: "Enter apropriate email format" });
    } else if (!checkPass(password)) {
        return res.status(401).json({ message: "Enter apropriate password format" });
    }

    try {
        pool.query('SELECT * from user WHERE email=? AND password=?', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        });

    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }

    const token = newToken(user);

    res.status(200).json({
        message: "User logged in",
        user: {
            username: user.username,
            friendsIds: [],
            authData: {
                userId: user._id,
                idToken: token,
                expiresIn: 2000
            }
        }
    });
};

module.exports = { register, login };
