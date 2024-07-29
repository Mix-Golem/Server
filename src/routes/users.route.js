import express from "express";
import {
	sendEmail,
	checkVerification,
	signup,
} from "../controllers/users.controller";

export const usersRoute = express.Router();

//=================================
//             Users
//=================================

usersRoute.get("/signup/email/send-verification-code", async (req, res) => {
	const result = await sendEmail(req, res);
});

usersRoute.post("/signup/email/check-verification-code", async (req, res) => {
	const result = await checkVerification(req, res);
});

usersRoute.post("/signup", async (req, res) => {
	const result = await signup(req, res);
});
