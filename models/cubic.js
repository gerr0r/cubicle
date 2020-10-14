const mongoose = require("mongoose");

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    image: {
        type: String,
        validate: {
            validator: url => /^https?:\/{2}/.test(url),
            message: url => `${url.value} is not valid url`
        },
        required: true
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: "ObjectId",
        ref: "Accessory"
    }],
    creatorId: {
        type: String,
        required: true,
        ref: "User"
    }
});


module.exports = mongoose.model("Cubic", CubeSchema);