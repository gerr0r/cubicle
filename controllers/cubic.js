const Accessory = require("../models/accessory");
const Cubic = require("../models/cubic")

const getCubes = async () => {
    let cubes = await Cubic.find().lean();
    return cubes;
}

const getCube = async id => {
    let cube = await Cubic.findById(id).lean();
    return cube;
}

const searchCubes = async (pattern, fromLevel, toLevel) => {
    pattern = pattern.trim();
    fromLevel = fromLevel.trim();
    toLevel = toLevel.trim();

    if (!fromLevel || isNaN(fromLevel) || fromLevel < 1) fromLevel = 1;
    else if (fromLevel > 6) fromLevel = 6;
    else fromLevel = Number(fromLevel);

    if (!toLevel || isNaN(toLevel) || toLevel > 6) toLevel = 6;
    else if (toLevel < 1) toLevel = 1;
    else toLevel = Number(toLevel);

    if (fromLevel > toLevel) {
        console.log("Error");
        return;
    }

    let data = await Cubic.find().lean();
    let cubes = data.filter(obj =>
        (obj.name.includes(pattern) || obj.description.includes(pattern))
        && obj.level >= fromLevel
        && obj.level <= toLevel);

    return cubes;
}

const updateCube = async (cubeId, accessoryId) => {
    await Cubic.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accessoryId]
        }
    });
    await Accessory.findByIdAndUpdate(accessoryId, {
        $addToSet: {
            cubes: [cubeId]
        }
    });
}

module.exports = {
    getCubes,
    getCube,
    searchCubes,
    updateCube
}