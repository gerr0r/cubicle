const Accessory = require("../models/accessory");
const Cubic = require("../models/cubic")
const jwt = require("jsonwebtoken")

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
        console.error("Error");
        return;
    }

    let data = await Cubic.find().lean();
    let cubes = data.filter(obj =>
        (obj.name.includes(pattern) || obj.description.includes(pattern))
        && obj.level >= fromLevel
        && obj.level <= toLevel);

    return cubes;
}

const createCube = async (req, status = false, errors = []) => {
    const { name, description, image, level } = req.body;

    const token = req.cookies.uid;
    const decoded = jwt.verify(token, process.env.JWT_PK);
    const cube = new Cubic({ 
        name, 
        description, 
        image, 
        level, 
        creatorId: decoded._id 
    });

    try {
        await cube.save();
        status = true;
    } catch (error) {
        Object.keys(error.errors).forEach(path => errors.push(error.errors[path].properties.message));
    } finally {
        return { status , errors };
    }
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
    createCube,
    updateCube
}