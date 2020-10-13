const User = require("../models/user")
const bcrypt = require("bcrypt")

async function createUser(req) {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        console.error("Password confirmation mismatch!")
        return false;
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({ 
        username, 
        password: hash 
    });

    user.save(err => {
        if (err) {
            console.error(err);
        }
    })
    
    return true;
}

module.exports = {
    createUser
}