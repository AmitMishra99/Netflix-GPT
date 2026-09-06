import express from "express";
import { searchGPTMovies } from "../controllers/gpt.controller.js";

const gptRouter = express.Router();

gptRouter.post("/search", searchGPTMovies);

export default gptRouter;