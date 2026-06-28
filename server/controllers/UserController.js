const { User } = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const tokenGen = (res, id, email, login, role) => {
  const generateToken = jwt.sign(
    { id, email, login, role },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    },
  );

  res.cookie("token", generateToken, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

class UserController {
  async registration(req, res) {
    try {
      const { email, login, password } = req.body;
      if (!email || !password || !login) {
        return res.status(400).json({
          message: "Неуказана вся информация",
        });
      }

      const alreadyUser = await User.findOne({
        where: { [Op.or]: [{ email }, { login }] },
      });
      if (alreadyUser) {
        return res.status(400).json({
          message: "Пользователь с такой почтой или логином уже существует",
        });
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        email,
        login,
        password: hashPassword,
        role: "user",
      });

      const token = tokenGen(res, user.id, user.email, user.login, user.role);

      return res.json({
        message: "Успешная регистрация",
        user: { email: user.email, login: user.login, role: user.role },
      });
    } catch (e) {
      console.error("Ошибка регистрации:", e);

      return res.status(500).json({
        message: "Ошибка при регистрации",
      });
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body;
      if (!password || !login) {
        return res.status(400).json({
          message: "Неуказана вся информация",
        });
      }

      const user = await User.findOne({ where: { login } });
      if (!user) {
        return res.status(401).json({ message: "Пользователь не найден" });
      }

      let checkPassword = await bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        return res.status(400).json({
          message: "Введённые данные не совпадают",
        });
      }

      const token = tokenGen(res, user.id, user.email, user.login, user.role);

      return res.json({
        message: "Успешная авторизация",
        user: { id: user.id, login: user.login, role: user.role },
      });
    } catch (e) {
      return res.status(500).json({
        message: "Ошибка при авторизации",
      });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("token");

      return res.json({
        message: "Вы успешно вышли из аккаунта",
      });
    } catch (e) {
      return res.status(500).json({
        message: "Ошибка при выходе",
      });
    }
  }

  async check(req, res) {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const decoded = jwt.verify(token, process.env.JWT_KEY);

      const checkUserDatabase = await User.findOne({
        where: { email: decoded.email },
        attributes: ["id", "email", "login", "role"],
      });

      if (!checkUserDatabase) {
        return res.status(401).json({
          message: "Пользователь не найден",
        });
      }

      return res.json({
        message: "Авторизация прошла успешно",
        user: checkUserDatabase,
      });
    } catch (e) {
      return res.status(401).json({ message: "Недействительный токен" });
    }
  }
}

module.exports = new UserController();
