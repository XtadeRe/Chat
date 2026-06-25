const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "user" },
  avatar: { type: DataTypes.STRING, defaultValue: null },
});

const Chats = sequelize.define("chats", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, defaultValue: null },
  is_private: { type: DataTypes.BOOLEAN, defaultValue: true },
  last_message_id: { type: DataTypes.INTEGER, defaultValue: null },
});

const Chat_Participants = sequelize.define(
  "chat_participants",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    last_read_message_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: true,
  },
);

const Messages = sequelize.define("messages", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  chat_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.STRING, validate: { len: [0, 600] } },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
});

User.belongsToMany(Chats, {
  through: Chat_Participants,
  foreignKey: "user_id",
  otherKey: "chat_id",
});
Chats.belongsToMany(User, {
  through: Chat_Participants,
  foreignKey: "chat_id",
  otherKey: "user_id",
});

Messages.belongsTo(User, { foreignKey: "user_id" });
Messages.belongsTo(Chats, { foreignKey: "chat_id" });

Chats.hasMany(Messages, { foreignKey: "chat_id" });
User.hasMany(Messages, { foreignKey: "user_id" });

Chats.belongsTo(Messages, {
  foreignKey: "last_message_id",
  as: "lastMessage",
});

module.exports = {
  User,
  Chats,
  Chat_Participants,
  Messages,
};
