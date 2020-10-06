// TODO: Require Controllers...
const { getCubes, getCube } = require("../controllers/get-cubes");
const Cubic = require("../models/cubic.js");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.render("index", {
            title: "Cibicle Workshop",
            cubes: getCubes()
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
        const cube = new Cubic(name, description, image, level);
        cube.save();
        res.redirect("/");
     });

    app.get("/details/:id", (req, res) => {
        res.render("details", {
            title: "Cube details",
            cube: getCube(req.params.id)
        });
    });

    app.get("*", (req, res) => {
        res.render("404", {
            title: "Not found"
        });
    });
};