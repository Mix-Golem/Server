import express from "express";
import {
	sendEmail,
	checkVerification,
	signup,
	login,
	logout,
} from "../controllers/users.controller";

export const usersRoute = express.Router();

//=================================
//             Users
//=================================

usersRoute.get("/signup/email/send-verification-code", async (req, res) => {
	await sendEmail(req, res);
});

usersRoute.post("/signup/email/check-verification-code", async (req, res) => {
	await checkVerification(req, res);
});

usersRoute.post("/signup", async (req, res) => {
	await signup(req, res);
});

usersRoute.post("/login", async (req, res) => {
	await login(req, res);
});

usersRoute.post("/logout", async (req, res) => {
	await logout(req, res);
});
