const Router = require("express");
const router = new Router();
const chatController = require("../controllers/ChatController");

router.get("/", chatController.getAllUsers);

router.get("/check", chatController.getUserChats);
router.post("/create", chatController.createChat);

module.exports = router;
