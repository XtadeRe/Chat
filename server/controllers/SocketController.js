const { Messages } = require("../models/model");

class SocketController {
  constructor(io) {
    this.io = io;
  }

  handleConnection(socket) {
    console.log(`a ${socket.handshake.address} connected`);
    try {
      socket.on("chat message", (data) => {
        console.log("message: " + data.message);
        console.log("userId: " + data.userId);
        console.log("chatId: " + data.chatId);

        const newMessage = Messages.create({
          chat_id: data.chatId,
          user_id: data.userId,
          text: data.message,
          is_read: false,
        });

        this.io.emit("chat message", {
          id: newMessage.id,
          message: newMessage.text,
          userId: newMessage.user_id,
          chatId: newMessage.chat_id,
          isRead: newMessage.is_read,
          timestamp: new Date(),
          createdAt: newMessage.createdAt,
        });
      });
    } catch (e) {
      console.log(e);
    }

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} disconnected`);
    });
  }
}

module.exports = SocketController;
