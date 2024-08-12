import {
	findEmail,
	saveUser,
	findUser,
	saveTokenBlacklist,
} from "../models/dao/users.dao.js";
import mailSender from "../middleware/email.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { encrypt } from "../middleware/encrypt.js";
import { createJwt, verify } from "../middleware/jwt.js";

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
		const hashedCode = encrypt(randomNumber.toString().padStart(6, "0"));

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

/**
 * Method to join new user
 * @param {*} req signupRequestDTO
 * @returns password & passwordCheck correct(true - correct / false - incorrect)
 */
export const join = async (req) => {
	if (req.password === req.passwordCheck) {
		// if password correct
		// encrypt password
		req.password = encrypt(req.password);

		await saveUser(req);

		return true;
	} else {
		// if password incorrect
		return false;
	}
};

/**
 * Method to login user
 * @param {*} req loginRequestDTO
 * @returns bearer token / 1 - password incorrect / 2 - email doesn't exists
 */
export const loginService = async (req) => {
	if (await findEmailAlreadyExists(req.email)) {
		// if email exists
		const user = await findUser(req.email);

		if (bcrypt.compareSync(req.password, user.password)) {
			// if password correct - success
			user.password = "hidden";
			return createJwt(user);
		} else {
			// if password doesn't correct - fail
			console.log("password incorrect");
			return 2;
		}
	} else {
		// if email doesn't exists - fail
		console.log("email doesn't exists");
		return 1;
	}
};

/**
 * Method to add token on blacklist
 * @param {*} req token that add to blacklist
 * @returns null
 */
export const logoutService = async (req) => {
	console.log(req);
	await saveTokenBlacklist(req);
	return null;
};

/**
 * Method to get user info by token
 * @param {*} req user's information token
 * @returns user's information
 */
export const getUserInfoByToken = async (req) => {
	let info = verify(req).req;
	return info;
};

export const setUserProfileImage = async (token, req) => {
	let info = verify(token).req;
	console.log(info);
};