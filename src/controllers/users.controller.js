import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import jwt from "jsonwebtoken";
import { sendVerificationRequestDTO } from "../dtos/users.dto.js";
import { sendVerificationCode } from "../services/users.service.js";

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
	} catch (error) {
		console.log(error);
		res.send(response(BaseError));
	}
};
