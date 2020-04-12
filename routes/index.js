const router = require('express').Router();
const cp = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

router.use(cp());
router.use(session({ cookie: { maxAge: 60000 }, resave: true, saveUninitialized: false, secret: 'hitwo-api' }));
router.use(flash());

//api routes
router.use('/mobile', require('./mobile'));
router.use('/store', require('./web'));
router.use('/public', require('./public'));

//web view routes routes
router.get("/portal", (req, res) => {
    res.render("portal_login", {
        title: "Easy Locate | Portal Login",
        notifications: req.flash("notifications"),
        errors: req.flash("errors"),
        success: req.flash("success")
    });
});

router.get("/register", (req, res) => {
    res.render("portal_register", {
        title: "Easy Locate | Portal Register", 
        notifications: req.flash("notifications"),
        errors: req.flash("errors"),
        success: req.flash("success")
    })
});

router.get("/dashboard", (req, res) => {
    res.render("protected/dashboard", {
        title: "Easy Locate | Dashboard",
        notifications: req.flash("notifications"),
        errors: req.flash("errors"),
        success: req.flash("success")
    });
});

module.exports = router;
