const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");

router.get("/check", userController.check);

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;
