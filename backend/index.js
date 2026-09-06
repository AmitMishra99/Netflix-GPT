import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import dns from "dns";
dns.setServers([process.env.DS1, process.env.DS2]);

const PORT = process.env.PORT || 3000;
const app = express();

import connectDB from "./config/connectDB.js";
import authRouter from "./routes/auth.route.js";
import gptRouter from "./routes/gpt.route.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/gpt", gptRouter);

connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
  }
});
