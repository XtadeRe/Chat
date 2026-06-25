require("dotenv").config();

const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const os = require("os");
const router = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const sequelize = require("./db");
const models = require("./models/model");
const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use("/api", router);

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (e) {
    console.log(`Error: ${e}!!!`);
  }
  server.listen(PORT, () => {
    console.log("server running http://localhost:3000");
  });
}
main();
