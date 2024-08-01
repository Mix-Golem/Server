import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import {
	checkVerificationRequestDTO,
	loginRequestDTO,
	signupRequestDTO,
} from "../dtos/users.dto.js";
import {
	sendVerificationCode,
	checkVerificationCode,
	join,
	loginService,
} from "../services/users.service.js";

//=================================
//             Users
//=================================

// /users/signup/email/send-verification-code
export const sendEmail = async (req, res) => {
	try {
		let encryptedCode = await sendVerificationCode(req.param("email"));

		if (encryptedCode !== null) {
			// if email doesn't exists
			console.log(encryptedCode);

			res.send(response(status.SUCCESS, encryptedCode));
		} else {
			// if email exists
			res.send(response(status.EMAIL_ALREADY_EXIST, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/signup/email/check-verification-code
export const checkVerification = async (req, res) => {
	try {
		if (await checkVerificationCode(checkVerificationRequestDTO(req.body))) {
			// if code correct
			res.send(response(status.SUCCESS, null));
		} else {
			// if code incorrect
			res.send(response(status.CODE_NOT_CORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/signup
export const signup = async (req, res) => {
	try {
		if (await join(signupRequestDTO(req.body))) {
			// if password correct
			res.send(response(status.SUCCESS, null));
		} else {
			// if password incorrect
			res.send(response(status.PASSWORD_INCORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/login
export const login = async (req, res) => {
	try {
		const result = await loginService(loginRequestDTO(req.body));
		if (result === 1) {
			// if login fail by email doesn't exists
			res.send(response(status.LOGIN_EMAIL_NOT_EXIST, null));
		} else if (result === 2) {
			// if login fail by password incorrect
			res.send(response(status.LOGIN_PASSWORD_WRONG, null));
		} else {
			// if login success
			res.send(response(status.SUCCESS, result));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};
