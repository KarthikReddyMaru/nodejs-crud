const router = require('express').Router();

const {register} = require("../controller/AuthController");

// router.route("/login")
//     .get(basicAuth)

router.route("/register")
    .post(register);

// router.route("/logout")
//     .post(logout);

module.exports = router;