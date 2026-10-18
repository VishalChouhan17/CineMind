import { Router, Request, Response, NextFunction } from "express";
import { getTrending } from "../services/tmdb";
import { getGeminiRecommendations } from "../services/gemini";
import { getBedrockRecommendations } from "../services/bedrock";

export const recommendationsRouter = Router();

interface RecommendationRequest {
  query: string;
  mood?: string;
  maxDuration?: number;
  language?: string;
  familyMode?: boolean;
  aiProvider?: "openai" | "gemini" | "bedrock";
}

recommendationsRouter.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { query, mood, maxDuration, language, familyMode = false, aiProvider = "openai" }: RecommendationRequest = req.body;
    if (!query || typeof query !== "string" || query.trim().length === 0) {
      res.status(400).json({ error: "query is required" });
      return;
    }
    if (query.length > 500) {
      res.status(400).json({ error: "query must be under 500 characters" });
      return;
    }
    console.log(`\n[Recommendations] "${query}" | Provider: ${aiProvider} | Family: ${familyMode}`);

    const options = { mood, maxDuration, familyMode, language };
    let recommendations;
    let usedProvider = aiProvider;

    if (aiProvider === "bedrock") {
      try {
        recommendations = await getBedrockRecommendations(query, [], options);
        usedProvider = "bedrock";
      } catch (err: any) {
        console.warn("[Bedrock not configured, automatically falling back to OpenAI]:", err.message);
        recommendations = await getGeminiRecommendations(query, [], options);
        usedProvider = "openai";
      }
    } else {
      recommendations = await getGeminiRecommendations(query, [], options);
      usedProvider = "openai";
    }

    res.json({
      recommendations,
      meta: {
        query,
        aiProvider: usedProvider,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
});
