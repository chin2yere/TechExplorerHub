import express from "express";
import "./config/dotenv.js";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import { GitHub } from "./config/Auth.js";
import authRoutes from "./controllers/Auth.js";
import router from "./config/routes.js";

import setup from "./Database/setup.js";
setup();
const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://techexplorerhub-client.up.railway.app"
    : "http://localhost:5173";
const app = express();
app.use(
  session({
    secret: "secretcodepath",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
//
app.use(passport.initialize());
app.use(passport.session());
passport.use(GitHub);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use("/auth", authRoutes);

//
app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan("tiny"));

app.use("/", router);

app.get("/", (req, res) => {
  res.redirect(CLIENT_URL);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
