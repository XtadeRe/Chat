const Router = require("express");
const router = new Router();
const UserController = require("./userRouter");
const ChatController = require("./chatRouter");

router.use("/user", UserController);
router.use("/chat", ChatController);

module.exports = router;
