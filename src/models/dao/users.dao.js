import { status } from "../../../config/response.status";
import {
	findEmailSql,
	saveUserSql,
	findUserSql,
	expireToken,
	findPasswordById,
	updateProfileById,
	updateUserInfoWithoutPasswordSql,
	updateUserInfoWithPasswordSql,
	findUserNoticeByIdSql,
	withdrawByUserIdSql,
	deletePlaylistByUserIdSql,
	findMusicIdByUserIdSql,
	deleteMusicByUserIdSql,
	deleteMusicLinkBySongIdSql,
	deleteLyricsBySongIdSql,
	deleteFollowByUserIdSql,
	deleteFollowingByUserIdSql,
	deleteLikeByUserIdSql,
	deleteHistoryByUserIdSql,
	findByIdSql,
} from "../sql/users.sql";
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

// insert user
export const saveSocialUser = async (req) => {
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
			req.profile,
			null,
			req.provider,
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

// insert token on blacklist
export const saveTokenBlacklist = async (req) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(expireToken, [req]);

		return result;
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

// find password by id
export const findPassword = async (req) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(findPasswordById, [req]);

		return result[0][0].password;
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

// update profileImage by id
export const updateProfile = async (id, url) => {
	let conn;
	try {
		console.log("---------");
		console.log("updateProfile called");
		conn = await pool.getConnection();

		const result = await pool.query(updateProfileById, [url, id]);
		console.log(url);

		return result[0][0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

export const updateUserWithoutPassword = async (req, uid) => {
	let conn;
	try {
		console.log("---------");
		console.log("updateProfile called");
		conn = await pool.getConnection();

		const result = await pool.query(updateUserInfoWithoutPasswordSql, [
			req.name,
			req.introduce,
			uid,
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

export const updateUserWithPassword = async (req, uid) => {
	let conn;
	try {
		console.log("---------");
		console.log("updateProfile called");
		conn = await pool.getConnection();

		const result = await pool.query(updateUserInfoWithPasswordSql, [
			req.name,
			req.introduce,
			req.password,
			uid,
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

export const getAlNotificationById = async (uid) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(findUserNoticeByIdSql, [uid]);
		return result[0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

export const withdrawUser = async (uid) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(withdrawByUserIdSql, [
			new Date(),
			true,
			uid,
		]);
		return result[0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

export const deletePlaylistByUserId = async (uid) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(deletePlaylistByUserIdSql, [uid]);
		return result[0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

export const deleteMusicByUserId = async (uid) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const musicIds = await pool.query(findMusicIdByUserIdSql, [uid]);

		console.log(musicIds[0]);

		for (let i = 0; i < musicIds[0].length; i++) {
			console.log("called");
			await pool.query(deleteMusicLinkBySongIdSql, [musicIds[0][i].id]);
			await pool.query(deleteLyricsBySongIdSql, [musicIds[0][i].id]);
		}

		await pool.query(deleteMusicByUserIdSql, [uid]);

		return musicIds[0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

export const deleteFollowingByUserId = async (uid) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(deleteFollowByUserIdSql, [uid]);
		await pool.query(deleteFollowingByUserIdSql, [uid]);
		return result[0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

export const deleteLikeByUserId = async (uid) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(deleteLikeByUserIdSql, [uid]);

		return result[0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

export const deleteHistoryByUserId = async (uid) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(deleteHistoryByUserIdSql, [uid]);

		return result[0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

export const findById = async (uid) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(findByIdSql, [uid]);

		return result[0][0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};
