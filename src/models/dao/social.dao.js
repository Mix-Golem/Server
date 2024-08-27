import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { response } from "../../../config/response.js";
import { status } from "../../../config/response.status.js";
import {
	topRankQuery,
	todayRankQuery,
	followQuery,
	unfollowQuery,
	checkFollowQuery,
	checkUnfollowQuery,
	followerListQuery,
	followingListQuery,
	searchQuery,
	getPopularSql,
} from "../sql/social.sql.js";

//탑랭크 불러오기
export const getTopRankDao = async () => {
	let conn;
	try {
		conn = await pool.getConnection();
		const [rows] = await conn.query(topRankQuery);
		console.log("Top Rank DAO Data:", rows);
		conn.release();
		return rows;
	} catch (error) {
		console.error("Error in getTopRankDao:", error);
		throw new BaseError(response(status.PARAMETER_IS_WRONG, null));
	}
};

//투데이 랭크 불러오기
export const getTodayRankDao = async () => {
	let conn;
	try {
		conn = await pool.getConnection();
		const [rows] = await conn.query(todayRankQuery);
		conn.release();
		return rows;
	} catch (error) {
		console.error(error);
		throw new BaseError(response(status.PARAMETER_IS_WRONG, null));
	}
};

//팔로우 관계 확인
export const checkFollowDAO = async (followerId, followingId) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const [rows] = await conn.query(checkFollowQuery, [
			followerId,
			followingId,
		]);
		const count = rows[0].count;
		conn.release();
		return count > 0;
	} catch (error) {
		console.error(error);
		throw new BaseError(response(status.PARAMETER_IS_WRONG, null));
	}
};

//팔로우 불러오기
export const followDAO = async (followerId, followingId) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const [result] = await conn.query(followQuery, [followerId, followingId]);
		conn.release();
		return result.affectedRows > 0;
	} catch (error) {
		console.error(error);
		throw new BaseError(response(status.PARAMETER_IS_WRONG, null));
	}
};

//언팔로우 관계 확인
export const checkUnfollowDAO = async (followerId, followingId) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const [rows] = await conn.query(checkUnfollowQuery, [
			followerId,
			followingId,
		]);
		conn.release();
		return rows[0].count > 0;
	} catch (error) {
		console.error(error);
		throw new BaseError(response(status.PARAMETER_IS_WRONG, null));
	}
};

//언팔로우 불러오기
export const unfollowDAO = async (followerId, followingId) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const [result] = await conn.query(unfollowQuery, [followerId, followingId]);
		if (result.affectedRows === 0) {
			throw new BaseError(response(status.BAD_REQUEST, null));
		}
		conn.release();
		return true;
	} catch (error) {
		console.error(error);
		throw new BaseError(response(status.INTERNAL_SERVER_ERROR, null));
	}
};

//팔로잉 리스트 불러오기
export const followingListDAO = async (followerId) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const [rows] = await conn.query(followingListQuery, [followerId]);
		conn.release();
		return rows;
	} catch (error) {
		console.error(response(status.PARAMETER_IS_WRONG, null));
		throw new Error(error);
	}
};

//팔로워 리스트 불러오기
export const followerListDAO = async (followingId) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const [rows] = await conn.query(followerListQuery, [followingId]);
		conn.release();
		return rows;
	} catch (error) {
		console.error(response(status.PARAMETER_IS_WRONG, null));
		throw new Error(error);
	}
};

//검색 기능 불러오기
export const searchDAO = async (keyword) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const [rows] = await conn.query(searchQuery, [`%${keyword}%`]);
		console.log(keyword);
		conn.release();
		return rows;
	} catch (error) {
		console.error(response(status.PARAMETER_IS_WRONG, null));
		throw new Error(error);
	}
};

export const popularRankDAO = async () => {
	let conn;
	try {
		conn = await pool.getConnection();

		const result = await pool.query(getPopularSql, []);

		conn.release();
		return result[0];
	} catch (error) {
		console.error(response(status.PARAMETER_IS_WRONG, null));
		throw new Error(error);
	}
};
