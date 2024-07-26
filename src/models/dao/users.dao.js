import { status } from "../../../config/response.status";
import { findEmailSql } from "../sql/users.sql";
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
