const fs = require("fs");

const getCubes = () => {
    let cubes = fs.readFileSync("config/database.json");
    return JSON.parse(cubes);
}

const getCube = id => {
    let cubes = fs.readFileSync("config/database.json");
    return JSON.parse(cubes).find(cube => cube.id === id);
}

const searchCubes = (pattern, fromLevel, toLevel) => {
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

    let json = fs.readFileSync("config/database.json");
    let data = JSON.parse(json);

    let cubes = data.filter(obj =>
        (obj.name.includes(pattern) || obj.description.includes(pattern))
        && obj.level >= fromLevel
        && obj.level <= toLevel);

    return cubes;
}

module.exports = {
    getCubes,
    getCube,
    searchCubes
}