import { Router, Request, Response, NextFunction } from "express";
import { getTrending } from "../services/tmdb";

export const trendingRouter = Router();

trendingRouter.get("/", async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const trending = await getTrending();
    res.json({ trending, timestamp: new Date().toISOString() });
  } catch (error) { next(error); }
});
