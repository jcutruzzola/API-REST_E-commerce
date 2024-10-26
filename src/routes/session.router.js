const { Router } = require("express");
const router = Router()
const passport = require("passport");

const UserController = require("../controllers/user.controller.js");
const userController = new UserController();


router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", passport.authenticate("current", {session: false}), userController.current);
router.post("/logout", userController.logout);
 

module.exports = router;
