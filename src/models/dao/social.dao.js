import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import { getUserMemberSql, getSongInfoSql } from "../sql/social.sql.js";

export const getSongInfoDao = async () => {
  let conn;
  try {
    conn = await pool.getConnection(); 
    const [rows] = await conn.query(getSongInfoSql); 
    return rows;
  } catch (error) {
    console.error("Error in getSongInfoDao:", error);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  } finally {
    if (conn) conn.release(); 
  }
};

export const getUserMemberDao = async () => {
  let conn;
  try {
    conn = await pool.getConnection(); 
    const [rows] = await conn.query(getUserMemberSql); 
    return rows;
  } catch (error) {
    console.error("Error in getUserMemberDao:", error);
    throw new BaseError(status.PARAMETER_IS_WRONG);
  } finally {
    if (conn) conn.release(); 
  }
};
