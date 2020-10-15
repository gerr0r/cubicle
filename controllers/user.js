const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


function generateToken(data) {
    const { _id, username } = data;
    const payload = { _id, username }
    const token = jwt.sign(payload, process.env.JWT_PK)
    return token;
}

async function createUser(req, status = false) {
    const { username, password, repeatPassword } = req.body;

    if (password.length < 8) {
        console.error("Password should be minimum 8 symbols.")
        return { status }
    }

    if (!/^[A-Za-z0-9]+$/.test(password)) {
        console.error("Password should consist only of digits and English letters.")
        return { status }
    }

    if (password !== repeatPassword) {
        console.error("Password confirmation mismatch.")
        return { status }
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        password: hash
    });

    try {
        const userObj = await user.save()
        const token = generateToken(userObj)
        status = true
        return { status, token }
    } catch (error) {
        console.error(error);
        return { status }
    }
}

async function loginUser(req) {
    let status = false;
    const { username, password } = req.body;

    if (!username || !password) {
        console.error("Username and password required.")
        return { status }
    }

    const userObj = await User.findOne({ username })
    if (!userObj) {
        console.error("Username or password invalid!")
        return { status }
    }
    status = await bcrypt.compare(password, userObj.password)

    if (status) {
        const token = generateToken(userObj);
        return { status, token }
    } else {
        console.error("Username or password invalid!")
        return { status }
    }
}

function checkAuth(req, res, next) {
    const token = req.cookies.uid
    try {
        let decoded = jwt.verify(token, process.env.JWT_PK)
        next()
    } catch (error) {
        console.error(error)
        res.redirect("/")
    }
}

function checkGuest(req, res, next) {
    const token = req.cookies.uid
    if (token || token === '') return res.redirect("/")
    next()
}

function checkCreator(req, id) {
    const token = req.cookies.uid
    try {
        let decoded = jwt.verify(token, process.env.JWT_PK)
        if (decoded._id === id) return true;
        return false;
    } catch (error) {
        console.error(error)
        return false;
    }
}

module.exports = {
    createUser,
    loginUser,
    checkAuth,
    checkGuest,
    checkCreator
}