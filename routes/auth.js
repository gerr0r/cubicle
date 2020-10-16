const express = require("express")
const router = express.Router()

const { createUser, loginUser, checkGuest } = require("../controllers/user")

router.get("/register", checkGuest, (req, res) => {
    res.render("register", {
        title: "Register...",
        isLogged: Boolean(req.cookies.uid)
    });
});

router.post("/register", async (req, res) => {
    const user = await createUser(req);
    if (user.status) {
        res.cookie("uid", user.token)
        return res.redirect("/")
    }
    res.render("register", {
        title: "Register...",
        error: user.errors,
        username: req.body.username
    })
})

router.get("/login", checkGuest, (req, res) => {
    res.render("login", {
        title: "Login",
        isLogged: Boolean(req.cookies.uid)
    });
});

router.post("/login", async (req, res) => {
    const user = await loginUser(req);
    if (user.status) {
        res.cookie("uid", user.token)
        return res.redirect("/")
    }
    res.render("login", {
        title: "Login...",
        error: user.error,
        username: req.body.username
    })
});

router.get("/logout", (req, res) => {
    res.clearCookie("uid")
    res.redirect("/")
})

module.exports = router