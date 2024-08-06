import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import {deletePlaylistSql, insertPlaylistSql, playlistInfoSql, addSongsToPlaylistSql} from "../sql/playlist.sql.js";

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

// 플레이리스트 삭제 DAO
export const deletePlayListDAO = async (playlistID) =>{
    try {
        const conn = await pool.getConnection();
        await pool.query(deletePlaylistSql, [playlistID]);
        conn.release;
    }catch (error){
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 플레이리스트 조회 DAO
export const playlistInfoDAO = async (playlistId) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await pool.query(playlistInfoSql, [playlistId]);
        conn.release();
        return rows[0]; // 하나의 플레이리스트 결과만 반환
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 플레이리스트에 곡 추가 DAO
export const addSongsToPlaylistDAO = async (playlistId, songs) => {
    try {
        const conn = await pool.getConnection();
        for (let i = 0; i < songs.length; i++) {
            const { song_id, order } = songs[i];
            await pool.query(addSongsToPlaylistSql, [song_id, playlistId, order]);
        }
        conn.release();
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};