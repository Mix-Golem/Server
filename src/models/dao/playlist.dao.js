import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import { insertPlaylistSql } from "../sql/playlist.sql.js";

// 플레이리스트 삽입 to DB
export const insertPlaylistDAO = async (data) => {
    try {
        // DB 연결
        const conn = await pool.getConnection();
        // query문 실행
        const result = await pool.query(insertPlaylistSql, [data.id, data.title, data.createAt]);
        conn.release(); // 병목 현상 방지를 위해 꼭 release

        // 삽입된 플레이리스트의 id 반환
        return result[0].insertId;

    } catch (error) { // 오류 처리
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};
