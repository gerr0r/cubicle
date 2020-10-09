const Accessory = require("../models/accessory");
const Cube = require("../models/cubic");

async function getCubeAccessories(id) {
    let cubeAccessories = await Cube.findById(id).populate("accessories").lean();
    return cubeAccessories.accessories;
}

async function getRestAccessories(id) {
    let cubeAccessories = await getCubeAccessories(id);
    cubeAccessoriesIds = cubeAccessories.map(a => a._id);

    let restAccessories = await Accessory.find({"_id": {$nin: cubeAccessoriesIds}}).lean();
    return restAccessories;
}

module.exports = {
    getRestAccessories,
    getCubeAccessories
}