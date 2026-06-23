const Router = require("express");
const router = new Router();
const UserController = require("./userRouter");

router.use("/user", UserController);

module.exports = router;
