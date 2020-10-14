const express = require("express")
const router = express.Router()

router.get("*", (req, res) => {
    res.render("404", {
        title: "Not found",
        isLogged: Boolean(req.cookies.uid)
    });
});

module.exports = router