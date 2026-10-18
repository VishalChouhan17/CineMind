import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { recommendationsRouter } from "./routes/recommendations";
import { trendingRouter } from "./routes/trending";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Helmet with relaxed cross-origin resource policy for dev/TV webviews
app.use(helmet({ crossOriginResourcePolicy: false }));

// Permissive CORS for all localhost ports (5173, 5174, 5175, 3000, 4173) and Fire TV webviews
app.use(cors({
  origin: (origin, callback) => {
    // Allow any localhost port, 127.0.0.1, Fire TV Silk browser, or curl/no-origin
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback: allow all origins in dev to eliminate CORS issues completely
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const limiter = rateLimit({ windowMs: 60000, max: 100, standardHeaders: true, legacyHeaders: false });
app.use("/api/", limiter);
app.use(express.json({ limit: "10mb" }));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "CineMind Backend",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    providers: {
      openai: !!process.env.OPENAI_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY,
      bedrock: !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY),
      tmdb: !!process.env.TMDB_API_KEY,
    },
  });
});

app.use("/api/recommendations", recommendationsRouter);
app.use("/api/trending", trendingRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🎬 CineMind Backend running on http://localhost:${PORT}`);
  console.log(`   CORS:    ✅ Permissive (supports localhost:5173, 5174, 5175+)`);
  console.log(`   OpenAI:  ${process.env.OPENAI_API_KEY ? "✅ configured" : "❌ missing OPENAI_API_KEY"}`);
  console.log(`   TMDB:    ${process.env.TMDB_API_KEY ? "✅ configured" : "⚠️ using offline / live poster catalog"}`);
  console.log(`   Bedrock: ${process.env.AWS_ACCESS_KEY_ID ? "✅ configured" : "⚠️ optional"}\n`);
});

export default app;
