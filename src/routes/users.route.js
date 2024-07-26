import express from "express";
import { sendEmail } from "../controllers/users.controller";

export const usersRoute = express.Router();

//=================================
//             Users
//=================================

usersRoute.get("/signup/email/send-verification-code", async (req, res) => {
	const result = await sendEmail(req, res);
});
