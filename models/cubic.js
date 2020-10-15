const mongoose = require("mongoose");

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [ 5, "Cube name should be minimum 5 symbols." ],
        match: [ /^[A-Za-z0-9 ]+$/, "Cube name should consist only of digits, spaces and English letters." ]
    },
    description: {
        type: String,
        required: true,
        minlength:[ 20, "Cube description should be minimum 20 symbols." ],
        maxlength: [ 500, "Cube description should be maximum 500 symbols." ],
        match: [ /^[A-Za-z0-9 ]+$/, "Cube description should consist only of digits, spaces and English letters." ]
    },
    image: {
        type: String,
        match: [ /^https?:\/{2}/, "Bad url: {VALUE}" ],
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