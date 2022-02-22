import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import csrf from "csurf";
dotenv.config();

const csrfProtection = csrf({ cookie: true });

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRouter);
//csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.get("/", (req, res) => {
  res.send("you hit server");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Hi");
});
