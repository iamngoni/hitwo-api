const router = require("express").Router();
const Store = require("./../../models/store");
const cp = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

router.use(cp());
router.use(session({ cookie: { maxAge: 60000 }, resave: true, saveUninitialized: false, secret: 'hitwo-api' }));
router.use(flash());
router.post("/", (req, res) => {
    var { email, password } = req.body;
    Store.findOne({ email }).then((store) => {
        if (!store) {
            console.log("store doesn't exist");
            req.flash("errors", "Store with provided email doesn't exist.");
            return res.redirect("/portal");
        }

        if(!store.validatePassword(password)){
            console.log("incorrect password");
            req.flash("errors", "The provided password was incorrect.");
            return res.redirect("/portal");
        }
        console.log("login success. redirecting to dashboard");
        req.flash("success", "Store successfully signed in.");
        res.cookie('store_id', store._id);
        return res.redirect("/dashboard")
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
    });
});

module.exports = router;