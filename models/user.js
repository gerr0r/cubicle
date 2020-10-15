const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, "Username should be minimum 5 symbols." ],
        match: [ /^[A-Za-z0-9]+$/, "Username should consist only of digits and English letters." ]
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", UserSchema)