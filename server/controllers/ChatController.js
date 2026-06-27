const { User, Chats, Chat_Participants } = require("../models/model");

class ChatController {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "login", "email"],
      });

      return res.status(200).json({ users: users });
    } catch (e) {
      console.log("Ошибка при получении пользователей:", e);
      return res
        .status(500)
        .json({ error: "Ошибка на сервере или при получении пользователя" });
    }
  }

  async createChat(req, res) {
    try {
      const userId = req.body.user_id;
      if (!userId) {
        return res
          .status(400)
          .json({ message: "Проблема создания. Возможно вы не авторизованы" });
      }

      const alreadyUser = await User.findOne({ where: { id: userId } });
      if (!alreadyUser) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const chat = await Chats.create({
        name: "Переписка",
      });

      await Chat_Participants.create({
        chat_id: chat.id,
        user_id: userId,
        last_read_message_id: null,
      });

      const secondUserId = req.body.second_user_id;
      const secondUser = await User.findOne({ where: { id: secondUserId } });
      if (!secondUser) {
        return res
          .status(400)
          .json({ message: "Второй пользователь не найден" });
      }
      await Chat_Participants.create({
        chat_id: chat.id,
        user_id: secondUserId,
        last_read_message_id: null,
      });

      return res.status(201).json({
        message: "Чат успешно создан",
        chat: chat,
        participants: [userId, secondUserId].filter(Boolean),
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Ошибка при создании чата",
        error: e.message,
      });
    }
  }

  async getUserChats(req, res) {
    try {
      const userId = req.query.user_id;
      if (!userId) {
        return res.status(400).json({
          message: "Не передан user_id",
        });

        console.log("Айди", userId);
      }
      const chatId = await Chat_Participants.findAll({
        where: { user_id: userId },
        attributes: ["chat_id"],
      });
      if (!chatId) {
        return res.status(200).json({ message: "У вас нет активных чатов" });
      }

      const chatIds = chatId.map((p) => p.chat_id);
      const chats = await Chats.findAll({ where: { id: chatIds } });

      return res.status(200).json({
        chats: chats,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Ошибка поиска чата",
        error: e.message,
      });
    }
  }

  async getOneChatInfo(req, res) {
    try {
      const chatId = req.query.chat_id;
      const authUserId = req.query.auth_userId;

      if (!chatId) {
        return res.status(400).json({
          message: "Не передан chat_id",
        });
      }

      const participants = await Chat_Participants.findAll({
        where: { chat_id: chatId },
        attributes: ["user_id"],
      });

      if (!participants || participants.length === 0) {
        return res.status(404).json({
          message: "Участники не найдены",
        });
      }

      const userIds = participants.map((p) => p.user_id);
      console.log(userIds);

      const targetUserId = userIds.find((id) => id != authUserId);

      if (!targetUserId) {
        return res.status(404).json({
          message: "Собеседник не найден",
        });
      }

      const user = await User.findOne({ where: { id: targetUserId } });

      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      return res.status(200).json({
        message: `Вы в чате с ${user.login}`,
        user: {
          id: user.id,
          login: user.login,
          role: user.role,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Ошибка поиска чата",
        error: e.message,
      });
    }
  }
}

module.exports = new ChatController();
