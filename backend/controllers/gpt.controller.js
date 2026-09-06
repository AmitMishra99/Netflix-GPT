import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-20b",
  temperature: 0.7,
  maxRetries: 2,
});

const movieSchema = z.object({
  movies: z.array(z.string()).length(5),
});

export const searchGPTMovies = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const structuredModel = model.withStructuredOutput(movieSchema);

    const response = await structuredModel.invoke(`
You are a movie recommendation system.

Based on the user's query, recommend exactly 5 movies.

User query: "${query}"

Return 5 relevant movie names.
`);

    console.log(response);

    return res.status(200).json({
      success: true,
      movies: response.movies,
    });
  } catch (error) {
    console.error("GPT movie search error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get movie recommendations",
      error: error.message,
    });
  }
};
