import express from "express";
import { rank, follow, unfollow } from "../controllers/social.controller";
export const socialRoute = express.Router();

//랭크 조회하는 라우트
socialRoute.get("/rank/:rank", async (req, res) => {
  const result = await rank(req, res);
});

//소셜 팔로우 하는 라우트
socialRoute.post("/follow/follower", async (req, res) => {
  const result = await follow(req, res);
});

//소셜 팔로우 취소하는 라우트
socialRoute.delete("social/unfollow", async (req, res) => {
  const result = await unfollow(req, res);
})