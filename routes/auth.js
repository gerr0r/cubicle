const express = require("express")
const router = express.Router()

const { createUser } = require("../controllers/user")

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register..."
    });
});

router.post("/register", async (req, res) => {
    const user = await createUser(req);
    if (user) {
        return res.redirect("/login")
    }
    res.redirect("/register");
})

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

module.exports = router