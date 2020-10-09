// TODO: Require Controllers...
const { getCubes, getCube, searchCubes } = require("../controllers/get-cubes");
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
            if (err) throw err;
            else res.redirect("/");
        });
    });

    app.get("/details/:id", async (req, res) => {
        res.render("details", {
            title: "Cube details",
            cube: await getCube(req.params.id)
        });
    });

    app.post("/", (req, res) => {
        const { search, from, to } = req.body;
        res.render("index", {
            title: "Search results:",
            cubes: searchCubes(search, from, to)
        });
    });

    app.get("/create/accessory", (req, res) => {
        res.render("createAccessory", {
            title: "Create Accessory..."
        });
    });

    app.post("/create/accessory", (req, res) => {
        const { name, description, image} = req.body;
        const accessory = new Accessory({ name, description, image});
        accessory.save(err => {
            if (err) throw err;
            else res.redirect("/create/accessory");
        })
    });

    app.get("/attach/accessory/:id", async (req, res) => {
        res.render("attachAccessory", {
            title: "Attach Accessory...",
            cube: await getCube(req.params.id)
        });
    });

    app.get("*", (req, res) => {
        res.render("404", {
            title: "Not found"
        });
    });
};