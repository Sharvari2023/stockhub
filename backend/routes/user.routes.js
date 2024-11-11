const express = require("express");
const { login, register } = require("../controllers/user.controller");

const router = express.Router();
// to redirect to login
router.post("/login", login);
// to redirect to signup
router.post("/signup", register);

module.exports = router;

