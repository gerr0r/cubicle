const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // checked on backend
        unique: true,
        minlength: [ 5, "Username should be minimum 5 symbols." ], // checked on backend
        match: [ /^[A-Za-z0-9]+$/, "Username should consist only of digits and English letters." ] // checked on backend
    },
    password: {
        type: String,
        required: true // checked on backend
    }
})

module.exports = mongoose.model("User", UserSchema)