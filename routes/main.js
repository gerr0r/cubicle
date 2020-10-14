const express = require("express");
const router = express.Router()

const { getCubes, getCube, searchCubes, createCube, updateCube } = require("../controllers/cubic");
const { getRestAccessories, getCubeAccessories, createAccessory } = require("../controllers/accessory");
const { checkAuth } = require("../controllers/user")

router.get("/", async (req, res) => {
    res.render("index", {
        title: "Cibicle Workshop",
        cubes: await getCubes(),
        isLogged: Boolean(req.cookies.uid)
    });
});

router.post("/", async (req, res) => {
    const { search, from, to } = req.body;
    res.render("index", {
        title: "Search results:",
        cubes: await searchCubes(search, from, to)
    });
});


router.get("/create", checkAuth, (req, res) => {
    res.render("create-cube", {
        title: "Add new cube...",
        isLogged: Boolean(req.cookies.uid)
    });
});

router.post("/create", checkAuth, async (req, res) => {
    const cube = await createCube(req)
    if (cube.status) {
        res.redirect("/")
    } else {
        res.redirect("/create");
    }
});

router.get("/edit", checkAuth, (req, res) => {
    res.render("edit-cube", {
        title: "Edit cube...",
        isLogged: Boolean(req.cookies.uid)
    });
});

router.get("/delete", checkAuth, (req, res) => {
    res.render("delete-cube", {
        title: "Delete cube...",
        isLogged: Boolean(req.cookies.uid)
    });
});

router.get("/details/:id", async (req, res) => {
    res.render("details-cube", {
        title: "Cube details",
        isLogged: Boolean(req.cookies.uid),
        cube: await getCube(req.params.id),
        accessories: await getCubeAccessories(req.params.id)
    });
});



router.get("/create/accessory", checkAuth, (req, res) => {
    res.render("create-accessory", {
        title: "Create Accessory...",
        isLogged: Boolean(req.cookies.uid)
    });
});

router.post("/create/accessory", checkAuth, async (req, res) => {
    const accessory = await createAccessory(req);
    if (accessory.status) {
        res.redirect("/")
    } else {
        res.redirect("/create/accessory");
    }
});

router.get("/attach/accessory/:id", checkAuth, async (req, res) => {
    res.render("attach-accessory", {
        title: "Attach Accessory...",
        isLogged: Boolean(req.cookies.uid),
        cube: await getCube(req.params.id),
        accessories: await getRestAccessories(req.params.id)
    });
});

router.post("/attach/accessory/:id", checkAuth, async (req, res) => {
    let { accessory } = req.body;
    await updateCube(req.params.id, accessory);
    res.redirect(`/details/${req.params.id}`);
    console.log(decoded)
});

module.exports = router