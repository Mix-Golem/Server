import { findEmail, saveUser } from "../models/dao/users.dao.js";
import mailSender from "../../config/email.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

//=================================
//             Users
//=================================

/**
 * Method to send verification code to email
 * @param {*} req email to send verification code
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

		const hashedCode = bcrypt.hashSync(
			randomNumber.toString().padStart(6, "0"),
			salt
		);

		return hashedCode;
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

/**
 * Method to check verification code is correct
 * @param {*} req encrypted verificaiton code & plaintext code
 * @returns verification code correct(true - code correct / false - code incorrect)
 */
export const checkVerificationCode = async (req) => {
	const code = req.code;

	return bcrypt.compareSync(code.toString(), req.cipherCode);
};

export const join = async (req) => {
	if (req.password === req.passwordCheck) {
		// if password correct
		// encrypt password
		const saltRound = process.env.USER_PASS_SALT;
		const salt = bcrypt.genSaltSync(Number(saltRound));

		req.password = bcrypt.hashSync(req.password, salt);

		saveUser(req);

		return true;
	} else {
		// if password incorrect
		return false;
	}
};
