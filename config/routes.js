// TODO: Require Controllers...
const { getCubes, getCube } = require("../controllers/get-cubes");

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