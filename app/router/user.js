const express = require("express");
const userController = require("../controller/userController");
const backController = require("../controller/backController");


const router = express.Router();

router.get("/", backController.getHome);
router.get("/signin",backController.getSignin);
router.get("/signup",backController.getSignup);

router.post("/signup",userController.signup);
router.post("/signin",userController.signin);

router.post("/admin", userController.getHome);
router.get("/user", userController.getUser);


module.exports = router;