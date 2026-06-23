const { User } = require("../models/model");
const bcrypt = require("bcrypt");

class UserController {
  async registration(req, res) {
    try {
      const { email, login, password, avatar } = req.body;
      if (!email || !password || !login) {
        return res.status(400).json({
          message: "Неуказаны вся информация",
        });
      }

      const alreadyUser = await User.findOne({ $or: [{ email }, { login }] });
      if (alreadyUser) {
        return res.status(400).json({
          message: "Пользователь уже существует",
        });
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        email,
        login,
        password: hashPassword,
        avatar,
      });

      return res.json({
        message: "Успешная регистрация",
        user: { id: user.id, email: user.email, login: user.login },
      });
    } catch (e) {
      console.error("Ошибка регистрации:", e);

      return res.status(500).json({
        message: "Ошибка при регистрации",
      });
    }
  }
}

module.exports = new UserController();
