import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import connectDB from "./utils/db.js";
dotenv.config();

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.send("you hit server");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Hi");
});
