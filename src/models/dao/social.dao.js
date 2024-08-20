import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import { topRankQuery, todayRankQuery, followQuery } from "../sql/social.sql.js";

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
    await conn.query(followQuery, [followerId, followingId]);
    return true;
  } catch (error) {
    console.error(error);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  } finally {
    if (conn) {
      conn.release();
    }
  }
};