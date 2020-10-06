const { v4 } = require("uuid");
const fs = require("fs");

const dbFile = "config/database.json";
class Cubic {
    constructor(name = "Unnamed", description = "none", image = "common.jpg", level = 0) {
        this.id = v4();
        this.name = name;
        this.description = description;
        this.image = image;
        this.level = level;
    }

    save() {

        fs.readFile(dbFile, (err, data) => {
            if (err) throw err;
            let cubes = JSON.parse(data);
            cubes.push(this);
            fs.writeFile(dbFile, JSON.stringify(cubes, null, "\t"), err => {
                if (err) throw err;
            });
        });
    }
}

module.exports = Cubic;