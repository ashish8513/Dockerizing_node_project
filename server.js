import app from "./app.js";
import dotenv from "dotenv";
import http from "http";

dotenv.config();
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";

const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(
    `Server running in ${NODE_ENV} mode on http://localhost:${PORT}`
  );
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION!  Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});
