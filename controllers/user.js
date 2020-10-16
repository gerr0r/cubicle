const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


function generateToken(data) {
    const { _id, username } = data;
    const payload = { _id, username }
    const token = jwt.sign(payload, process.env.JWT_PK)
    return token;
}

async function createUser(req, status = false, errors = []) {
    const { username, password, repeatPassword } = req.body;

    function setError(msg) {
        console.error(msg)
        errors.push(msg)
    }

    if (!username) setError("Username is required.")
    if (username.length < 5) setError("Username should be minimum 5 symbols.")
    if (!/^[A-Za-z0-9]+$/.test(username)) setError("Username should consist only of digits and English letters.")
    if (!password) setError("Password is required.")
    if (password.length < 8) setError("Password should be minimum 8 symbols.")
    if (!/^[A-Za-z0-9]+$/.test(password)) setError("Password should consist only of digits and English letters.")
    if (password !== repeatPassword) setError("Password confirmation mismatch.")

    if (errors.length) {
        return { status , errors }
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
    } catch (err) {
        if (err.code === 11000) {
            setError(`User with name ${username} already exists!`);
            console.log(errors);
        } else {
            setError("General error");
        }
        return  { status , errors }
    }
}

async function loginUser(req, status = false) {
    const { username, password } = req.body;

    if (!username || !password) {
        let msg = "Username and password required."
        console.error(msg)
        return { status , error: [ msg ] }
    }

    const userObj = await User.findOne({ username })
    if (!userObj) {
        let msg = ("Username or password invalid!")
        console.error(msg)
        return { status , error: [ msg ] }
    }
    status = await bcrypt.compare(password, userObj.password)

    if (status) {
        const token = generateToken(userObj);
        return { status, token }
    } else {
        let msg = ("Username or password invalid!")
        console.error(msg)
        return { status , error: [ msg ] }
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