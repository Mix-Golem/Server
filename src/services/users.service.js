import { findEmail } from "../models/dao/users.dao.js";
import mailSender from "../../config/email.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

//=================================
//             Users
//=================================

/**
 * Method to send verification code to email
 * @param {*} req sendVerificationRequestDTO from users.dto.js
 * @returns encrypted verification code
 */
export const sendVerificationCode = async (req) => {
	if (await findEmailAlreadyExists(req)) {
		// logic of already exists
		console.log("exists");
		return null;
	} else {
		// logic of doesn't exists
		console.log("doesn't exists");

		// 이메일 인증코드 난수 생성
		const randomNumber = Math.floor(Math.random() * 1000000);
		mailSender.sendGmail(req, randomNumber.toString().padStart(6, "0"));

		// 인증코드 암호화
		const saltRound = process.env.USER_PASS_SALT;
		const salt = bcrypt.genSaltSync(Number(saltRound));

		const hashedPassword = bcrypt.hashSync(
			randomNumber.toString().padStart(6, "0"),
			salt
		);

		return hashedPassword;
	}
};

/**
 * Method to find email already exists
 * @param {*} email email to find exists
 * @returns email exists(true - already exists / false - doesn't exists)
 */
const findEmailAlreadyExists = async (email) => {
	const user = await findEmail(email);
	return user;
};
