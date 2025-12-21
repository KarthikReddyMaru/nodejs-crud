const router = require('express').Router();

const {register, basicAuth} = require("../controller/AuthController");

router.route("/login")
    .get(basicAuth)

router.route("/register")
    .post(register);

module.exports = router;