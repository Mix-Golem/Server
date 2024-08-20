import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import { topRankQuery, todayRankQuery, followQuery, unfollowQuery } from "../sql/social.sql.js";

export const getTopRankDao = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query(topRankQuery);
    console.log("Top Rank DAO Data:", rows); 
    return rows;
  } catch (error) {
    console.error("Error in getTopRankDao:", error);
    throw new BaseError(status.PARAMETER_IS_WRONG, "쿼리 실행 중 오류 발생");
  } finally {
    if (conn) conn.release();
  }
};

export const getTodayRankDao = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query(todayRankQuery);
    return rows;
  } catch (error) {
    console.error("Error in getTodayRankDao:", error);
    throw new BaseError(status.PARAMETER_IS_WRONG, "쿼리 실행 중 오류 발생");
  } finally {
    if (conn) conn.release();
  }
};

export const followDAO = async (followerId, followingId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.query(followQuery, [
      followerId,
      followingId,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(error);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  } finally {
    if (conn) conn.release();
  }
};
export const unfollowDAO = async (followerId, followingId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.query(unfollowQuery, [followerId, followingId]);
    if (result.affectedRows === 0) {
      throw new BaseError(
        status.BAD_REQUEST,
        "팔로우 관계가 존재하지 않거나 팔로잉 ID가 NULL입니다."
      );
    }

    return true;
  } catch (error) {
    console.error(error);
    throw new BaseError(status.INTERNAL_SERVER_ERROR,);
  } finally {
    if (conn) conn.release();
  }
};