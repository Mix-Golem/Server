import express from "express";
import {
	rank,
	follow,
	unfollow,
	followlist,
	search,
	getPopular,
} from "../controllers/social.controller";
import { verify } from "../middleware/jwt";
export const socialRoute = express.Router();

socialRoute.use(verify);

//랭크 조회하는 라우트
socialRoute.get("/rank/:rank", async (req, res) => {
	const result = await rank(req, res);
});

//소셜 팔로우 하는 라우트
socialRoute.post("/follow/follower", async (req, res) => {
	const result = await follow(req, res);
});

//소셜 팔로우 취소하는 라우트
socialRoute.delete("/follow/unfollow", async (req, res) => {
	const result = await unfollow(req, res);
});

//팔로워들 보여주는 라우트
socialRoute.get("/info/followlist", async (req, res) => {
	const result = await followlist(req, res);
});

//소셜 페이지 검색기능 라우트
socialRoute.get("/search", async (req, res) => {
	const result = await search(req, res);
});

socialRoute.get("/popular", async (req, res) => {
	await getPopular(req, res);
});
