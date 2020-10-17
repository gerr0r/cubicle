const mongoose = require("mongoose");

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Accessory name is required" ],
        minlength: [ 5, "Accessory name should be minimum 5 symbols." ],
        match: [ /^[A-Za-z0-9 ]+$/, "Accessory name should consist only of digits, spaces and English letters." ]
    },
    description: {
        type: String,
        required: [ true, "Accessory description is required" ],
        minlength:[ 20, "Accessory description should be minimum 20 symbols." ],
        maxlength: [ 500, "Accessory description should be maximum 500 symbols." ],
        match: [ /^[A-Za-z0-9 ]+$/, "Accessory description should consist only of digits, spaces and English letters." ]
    },
    image: {
        type: String,
        required: [ true, "Accessory image url is required" ],
        match: [ /^https?:\/{2}/, "Bad url: {VALUE}" ]
    },
    cubes: [{
        type: "ObjectId",
        ref: "Cubic"
    }]
});


module.exports = mongoose.model("Accessory", AccessorySchema);