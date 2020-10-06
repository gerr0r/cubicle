const fs = require("fs");

const getCubes = () => {
    let cubes = fs.readFileSync("config/database.json");
    return JSON.parse(cubes);
}

const getCube = id => {
    let cubes = fs.readFileSync("config/database.json");
    return JSON.parse(cubes).find(cube => cube.id === id);
}


module.exports = {
    getCubes,
    getCube
}