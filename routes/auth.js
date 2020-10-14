const express = require("express")
const router = express.Router()

const { createUser, loginUser } = require("../controllers/user")

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register..."
    });
});

router.post("/register", async (req, res) => {
    const user = await createUser(req);
    if (user.status) {
        res.cookie("uid", user.token)
        return res.redirect("/")
    }
    res.redirect("/register");
})

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

router.post("/login", async (req, res) => {
    const user = await loginUser(req);
    if (user.status) {
        res.cookie("uid", user.token)
        return res.redirect("/")
    }
    res.redirect("/login");
})

module.exports = router