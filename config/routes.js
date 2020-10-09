// TODO: Require Controllers...
const { getCubes, getCube, searchCubes, updateCube } = require("../controllers/cubic");
const { getRestAccessories, getCubeAccessories } = require("../controllers/accessory");
const Cubic = require("../models/cubic");
const Accessory = require("../models/accessory");

module.exports = (app) => {

    app.get("/", async (req, res) => {
        res.render("index", {
            title: "Cibicle Workshop",
            cubes: await getCubes()
        });
    });

    app.get("/about", (req, res) => {
        res.render("about", {
            title: "About us"
        });
    });

    app.get("/create", (req, res) => {
        res.render("create", {
            title: "Add new cube..."
        });
    });

    app.post("/create", (req, res) => {
        const { name, description, image, level } = req.body;
        const cube = new Cubic({ name, description, image, level });
        cube.save(err => {
            if (err) {
                console.error(err);
                res.redirect("/create");
            }
            else res.redirect("/");
        });
    });

    app.get("/details/:id", async (req, res) => {
        res.render("details", {
            title: "Cube details",
            cube: await getCube(req.params.id),
            accessories: await getCubeAccessories(req.params.id)
        });
    });

    app.post("/", async (req, res) => {
        const { search, from, to } = req.body;
        res.render("index", {
            title: "Search results:",
            cubes: await searchCubes(search, from, to)
        });
    });

    app.get("/create/accessory", (req, res) => {
        res.render("createAccessory", {
            title: "Create Accessory..."
        });
    });

    app.post("/create/accessory", (req, res) => {
        const { name, description, image} = req.body;
        const accessory = new Accessory({ name, description, image });
        accessory.save(err => {
            if (err) {
                console.error(err);
            }
            res.redirect("/create/accessory");
        })
    });

    app.get("/attach/accessory/:id", async (req, res) => {
        res.render("attachAccessory", {
            title: "Attach Accessory...",
            cube: await getCube(req.params.id),
            accessories: await getRestAccessories(req.params.id)
        });
    });

    app.post("/attach/accessory/:id", async (req, res) => {
        let { accessory } = req.body;
        await updateCube(req.params.id, accessory);
        res.redirect(`/details/${req.params.id}`);
    });

    app.get("*", (req, res) => {
        res.render("404", {
            title: "Not found"
        });
    });
};