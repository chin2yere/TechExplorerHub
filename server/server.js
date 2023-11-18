import express from "express";
import "./config/dotenv.js";
import cors from "cors";
import morgan from "morgan";

import router from "./config/routes.js";

import setup from "./Database/setup.js";
setup();
const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://techexplorerhub-client.up.railway.app"
    : "http://localhost:5173";
const app = express();
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan("tiny"));

app.use("/", router);

app.get("/", (req, res) => {
  res.send("<h1>Video Games API</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
