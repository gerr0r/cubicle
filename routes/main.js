// TODO: Require Controllers...
const { getCubes, getCube, searchCubes, updateCube } = require("../controllers/cubic");
const { getRestAccessories, getCubeAccessories } = require("../controllers/accessory");
const Cubic = require("../models/cubic");
const Accessory = require("../models/accessory");
const express = require("express");
const router = express.Router()

router.get("/", async (req, res) => {
    res.render("index", {
        title: "Cibicle Workshop",
        cubes: await getCubes()
    });
});

router.post("/", async (req, res) => {
    const { search, from, to } = req.body;
    res.render("index", {
        title: "Search results:",
        cubes: await searchCubes(search, from, to)
    });
});


router.get("/create", (req, res) => {
    res.render("create-cube", {
        title: "Add new cube..."
    });
});

router.post("/create", (req, res) => {
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

router.get("/edit", (req, res) => {
    res.render("edit-cube", {
        title: "Edit cube..."
    });
});

router.get("/delete", (req, res) => {
    res.render("delete-cube", {
        title: "Delete cube..."
    });
});

router.get("/details/:id", async (req, res) => {
    res.render("details-cube", {
        title: "Cube details",
        cube: await getCube(req.params.id),
        accessories: await getCubeAccessories(req.params.id)
    });
});



router.get("/create/accessory", (req, res) => {
    res.render("create-accessory", {
        title: "Create Accessory..."
    });
});

router.post("/create/accessory", (req, res) => {
    const { name, description, image } = req.body;
    const accessory = new Accessory({ name, description, image });
    accessory.save(err => {
        if (err) {
            console.error(err);
        }
        res.redirect("/create/accessory");
    })
});

router.get("/attach/accessory/:id", async (req, res) => {
    res.render("attach-accessory", {
        title: "Attach Accessory...",
        cube: await getCube(req.params.id),
        accessories: await getRestAccessories(req.params.id)
    });
});

router.post("/attach/accessory/:id", async (req, res) => {
    let { accessory } = req.body;
    await updateCube(req.params.id, accessory);
    res.redirect(`/details/${req.params.id}`);
});

module.exports = router