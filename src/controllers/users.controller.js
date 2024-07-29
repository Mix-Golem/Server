import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import jwt from "jsonwebtoken";
import { checkVerificationRequestDTO } from "../dtos/users.dto.js";
import {
	sendVerificationCode,
	checkVerificationCode,
} from "../services/users.service.js";

//=================================
//             Users
//=================================

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
