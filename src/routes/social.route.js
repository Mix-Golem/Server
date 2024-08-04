import express from "express";
import { rank } from "../controllers/social.controller";
export const socialRoute = express.Router();

socialRoute.get("/rank/:rank", async (req, res) => {
  const result = await rank(req, res);
});
