const mongoose = require("mongoose");

const AccessorySchema = new mongoose.Schema({
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
        required: true
    },
    cubes: [{
        type: "ObjectId",
        ref: "Cubic"
    }]
});


module.exports = mongoose.model("Accessory", AccessorySchema);