import { status } from "../../../config/response.status";
import { findEmailSql, saveUserSql, findUserSql } from "../sql/users.sql";
import { pool } from "../../../config/db.connect";

//=================================
//             Users
//=================================

// finding user by email
export const findEmail = async (req) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();
		const email = await pool.query(findEmailSql, [req]);
		if (email[0].length === 0) {
			console.log("email null");
			return null;
		} else {
			console.log(email[0][0].email);
			return email[0][0].email;
		}
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

// insert user
export const saveUser = async (req) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();
		const result = await pool.query(saveUserSql, [
			req.email,
			req.password,
			req.name,
			req.phonenumber,
			req.gender,
			req.birth,
			0,
			null,
			null,
			null,
			"USER",
			new Date(),
			new Date(),
		]);

		return null;
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

// bring encrypted password
export const findUser = async (req) => {
	let conn;
	try {
		console.log("---------");
		console.log(req);
		conn = await pool.getConnection();

		const user = await pool.query(findUserSql, [req]);

		return user[0][0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};
