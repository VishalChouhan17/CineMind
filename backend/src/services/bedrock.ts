import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { AIRecommendation } from "./gemini";
import { fetchLivePoster } from "./posterService";

const MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";

interface BedrockOptions {
  mood?: string;
  maxDuration?: number;
  familyMode?: boolean;
  language?: string;
}

/**
 * AWS Bedrock Service - Claude 3 Haiku for entertainment recommendations.
 * Fulfills the AWS Builder Challenge requirement for Amazon Developer Hackathon 2026.
 */
export async function getBedrockRecommendations(
  userQuery: string,
  _candidates: any[] = [],
  options: BedrockOptions = {}
): Promise<AIRecommendation[]> {
  const region = process.env.AWS_REGION || "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("AWS credentials (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY) not configured in backend/.env");
  }

  const client = new BedrockRuntimeClient({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  const prompt = `You are CineMind, an expert AI entertainment companion on Amazon Fire TV.

A user searched: "${userQuery}"
${options.mood ? `Mood: ${options.mood}` : ""}
${options.maxDuration ? `Max Duration: ${options.maxDuration} minutes` : ""}
${options.familyMode ? "CRITICAL: FAMILY MODE IS ON. Strictly exclude adult, violent, or R-rated content." : ""}
${options.language && options.language !== "any" ? `Preferred Language: ${options.language}` : ""}

Task:
Generate 10 to 12 highly relevant, distinct, and diverse movie or TV show recommendations that closely match the viewer's prompt. (Provide real, authentic cinema and television titles).

For each recommendation:
- title: exact movie or TV show title
- year: release year (e.g. 2023)
- genre: genre string (e.g. "Sci-Fi / Adventure", "Crime / Thriller")
- duration: runtime in minutes (e.g. 125)
- rating: score out of 10 (e.g. 8.6)
- overview: 2 sentences explaining the storyline
- aiExplanation: 1-2 personalized sentences explicitly explaining why this is a great match for "${userQuery}"
- matchScore: integer between 75 and 99
- mediaType: "movie" or "tv"

Respond ONLY with a JSON array in this schema:
[
  {
    "title": "Interstellar",
    "year": 2014,
    "genre": "Sci-Fi / Adventure",
    "duration": 169,
    "rating": 8.7,
    "overview": "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    "aiExplanation": "Why you will love it...",
    "matchScore": 96,
    "mediaType": "movie"
  }
]`;

  const requestBody = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 3500,
    temperature: 0.75,
    messages: [{ role: "user", content: prompt }],
  };

  try {
    console.log(`[AWS Bedrock] Query: "${userQuery}" via Claude 3 Haiku (${MODEL_ID})`);
    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(requestBody),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const rawText: string = responseBody.content[0].text
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const parsed = JSON.parse(rawText);
    const list: any[] = Array.isArray(parsed)
      ? parsed
      : (parsed.recommendations || parsed.results || parsed.movies || []);

    // Enrich with live IMDb/TMDB posters
    const enriched = await Promise.all(
      list.map(async (item, index) => {
        const title = item.title || "Recommended Title";
        const year = Number(item.year) || 2022;
        const posterUrl = await fetchLivePoster(title, year);

        return {
          title,
          year,
          genre: item.genre || "Cinema",
          duration: Number(item.duration) || 110,
          rating: Number(item.rating) || 8.0,
          overview: item.overview || "Curated title on Amazon Fire TV.",
          tmdbId: 2000 + index + Math.floor(Math.random() * 5000),
          posterUrl,
          aiExplanation: item.aiExplanation || "Selected by AWS Bedrock for your viewing mood.",
          matchScore: Number(item.matchScore) || 92,
          mediaType: item.mediaType === "tv" ? "tv" : "movie",
        } as AIRecommendation;
      })
    );

    return enriched;
  } catch (error) {
    console.error("[AWS Bedrock] Invocation error:", error);
    throw new Error(`Bedrock failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
