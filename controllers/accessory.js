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

async function createAccessory(req, status = false, errors = []) {
    const { name, description, image } = req.body;
    const accessory = new Accessory({ 
        name,
        description,
        image
    });
    
    try {
        await accessory.save();
        status = true;
    } catch (error) {
        Object.keys(error.errors).forEach(path => errors.push(error.errors[path].properties.message));
    } finally {
        return { status , errors};
    }
}

module.exports = {
    getRestAccessories,
    getCubeAccessories,
    createAccessory
}