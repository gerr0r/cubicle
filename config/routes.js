// TODO: Require Controllers...


module.exports = (app) => {

    app.get("/", (req, res) => {
        res.render("index", {
            title: "Cibicle Workshop"
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
            title: "Cube details"
        });
    });

    app.get("*", (req, res) => {
        res.render("404", {
            title: "Not found"
        });
    });
};