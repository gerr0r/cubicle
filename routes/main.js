const express = require("express");
const router = express.Router()

const { getCubes, getCube, searchCubes, createCube, updateCube } = require("../controllers/cubic");
const { getRestAccessories, getCubeAccessories, createAccessory } = require("../controllers/accessory");

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

router.post("/create", async (req, res) => {
    const cube = await createCube(req)
    if (cube.status) {
        res.redirect("/")
    } else {
        res.redirect("/create");
    }
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

router.post("/create/accessory", async (req, res) => {
    const accessory = await createAccessory(req);
    if (accessory.status) {
        res.redirect("/")
    } else {
        res.redirect("/create/accessory");
    }
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