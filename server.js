const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}...`);
});
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log(" 👋 SIGTERM RECEIVED, Shutting down  greacefully");
  server.close(() => {
    console.log("🎇 Process Terminated!");
  });
});
