import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { profileUploader } from "../services/s3.service.js";

import { checkFormat } from "../middleware/jwt.js";
import {
	checkVerificationRequestDTO,
	loginRequestDTO,
	signupRequestDTO,
	setProfileRequestDTO,
	verifyPasswordDTO,
} from "../dtos/users.dto.js";
import {
	sendVerificationCode,
	checkVerificationCode,
	join,
	loginService,
	logoutService,
	getUserInfoByToken,
	setUserProfileImage,
	isPasswordCorrect,
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

// /users/logout
export const logout = async (req, res) => {
	try {
		const token = await checkFormat(req.get("Authorization"));

		if (token !== null) {
			// if token format correct
			await logoutService(token);
			res.send(response(status.SUCCESS, null));
		} else {
			// if token format incorrect
			res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/info
export const getUserinfo = async (req, res) => {
	try {
		const token = await checkFormat(req.get("Authorization"));

		if (token !== null) {
			// if token format correct
			res.send(response(status.SUCCESS, await getUserInfoByToken(token)));
		} else {
			// if token format incorrect
			res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/info/set-profile
export const setUserProfile = async (req, res) => {
	try {
		const token = await checkFormat(req.get("Authorization"));
		if (token !== null) {
			// if token format correct
			const url = await profileUploader(req, res);
			await setUserProfileImage(token, url);
			res.send(response(status.SUCCESS, null));
		} else {
			// if token format incorrect
			res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/info/verify-password
export const checkPassword = async (req, res) => {
	try {
		// 이새끼 왜 인식 안되냐
		const token = await checkFormat(req.get("Authorization"));
		if (token !== null) {
			// if token format correct
			if (await isPasswordCorrect(token, verifyPasswordDTO(req.body))) {
				res.send(response(status.SUCCESS, null));
			} else {
				res.send(response(status.LOGIN_PASSWORD_WRONG, null));
			}
		} else {
			// if token format incorrect
			res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};
