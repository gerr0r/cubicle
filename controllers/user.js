const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function createUser(req) {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        console.error("Password confirmation mismatch!")
        return {status: false}
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({ 
        username, 
        password: hash 
    });

    try {
        const userObj = await user.save()
        const { _id, username } = userObj
        const payload = { _id, username }

        const token = jwt.sign(payload, process.env.JWT_PK)
        
        return {
            status: true,
            token
        }
    } catch (error) {
        console.error(error);
        return { status: false } 
    }

}

module.exports = {
    createUser
}