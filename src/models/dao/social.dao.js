import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import { topRankQuery, todayRankQuery } from "../sql/social.sql.js";

export const getTopRankDao = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query(topRankQuery);
    return rows;
  } catch (error) {
    console.error("Error in getRankDao:", error);
    throw new BaseError(status.PARAMETER_IS_WRONG);
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
    console.error("Error in getRankDao:", error);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  } finally {
    if (conn) conn.release();
  }
};
