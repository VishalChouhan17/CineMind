import OpenAI from "openai";
import { fetchLivePoster } from "./posterService";

export interface AIRecommendation {
  title: string;
  year: number;
  genre: string;
  duration: number;
  rating: number;
  overview: string;
  tmdbId: number;
  posterUrl: string;
  aiExplanation: string;
  matchScore: number;
  mediaType: string;
}

function buildOpenAIPrompt(
  userQuery: string,
  options: { mood?: string; maxDuration?: number; familyMode?: boolean; language?: string }
): string {
  return `You are CineMind, an expert AI entertainment companion on Amazon Fire TV.

A user searched: "${userQuery}"
${options.mood ? `Mood: ${options.mood}` : ""}
${options.maxDuration ? `Max Duration: ${options.maxDuration} minutes` : ""}
${options.familyMode ? "CRITICAL: FAMILY MODE IS ON. Strictly exclude adult, violent, or R-rated content." : ""}
${options.language && options.language !== "any" ? `Preferred Language: ${options.language}` : ""}

Task:
Generate 10 to 12 highly relevant, distinct, and diverse movie or TV show recommendations that closely match the viewer's prompt. (Provide true titles from cinema and television).

For each recommendation:
- title: exact real movie/show name
- year: release year (e.g. 2021)
- genre: genre string (e.g. "Sci-Fi / Thriller", "Romance / Comedy")
- duration: runtime in minutes (e.g. 110)
- rating: score out of 10 (e.g. 8.4)
- overview: 2 sentences explaining the plot
- aiExplanation: 1-2 personalized sentences explicitly explaining why this is a great match for "${userQuery}"
- matchScore: integer between 72 and 99
- mediaType: "movie" or "tv"

Respond ONLY with a JSON object in this exact schema:
{
  "recommendations": [
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
  ]
}`;
}

export async function getGeminiRecommendations(
  userQuery: string,
  _candidates: any[],
  options: { mood?: string; maxDuration?: number; familyMode?: boolean; language?: string } = {}
): Promise<AIRecommendation[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not configured in backend/.env");

  const client = new OpenAI({ apiKey });
  const prompt = buildOpenAIPrompt(userQuery, options);

  try {
    console.log(`[OpenAI Generation] Query: "${userQuery}" | Mood: "${options.mood || ''}" | FamilyMode: ${options.familyMode}`);
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert movie recommendation engine that strictly returns valid JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.75,
      max_tokens: 3500,
      response_format: { type: "json_object" },
    });

    const raw = response.choices[0].message.content || "{}";
    const parsed = JSON.parse(raw);

    const list: any[] = Array.isArray(parsed)
      ? parsed
      : (parsed.recommendations || parsed.results || parsed.movies || Object.values(parsed)[0] || []);

    // Fetch live poster images concurrently for all recommendations
    const enrichedRecommendations = await Promise.all(
      list.map(async (item, index) => {
        const title = item.title || "Recommended Title";
        const year = Number(item.year) || 2022;
        const posterUrl = await fetchLivePoster(title, year);

        return {
          title,
          year,
          genre: item.genre || "Drama",
          duration: Number(item.duration) || 115,
          rating: Number(item.rating) || 8.0,
          overview: item.overview || "An engaging cinematic experience recommended for you.",
          tmdbId: 1000 + index + Math.floor(Math.random() * 5000),
          posterUrl,
          aiExplanation: item.aiExplanation || "Curated specifically to match your viewing preferences.",
          matchScore: Number(item.matchScore) || 90,
          mediaType: item.mediaType === "tv" ? "tv" : "movie",
        } as AIRecommendation;
      })
    );

    return enrichedRecommendations;
  } catch (error) {
    console.error("[OpenAI] Generation error:", error);
    throw new Error(`Failed to generate recommendations: ${error instanceof Error ? error.message : "OpenAI error"}`);
  }
}
