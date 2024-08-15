import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import {deletePlaylistSql, insertPlaylistSql, playlistInfoSql, addSongsToPlaylistSql, showUserPlaylistsSql, updatePlaylistNameSql, reorderSongsSql, updateSongOrderSql} from "../sql/playlist.sql.js";

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
// 유저의 플레이리스트 전체 조회 DAO
export const showUserPlaylistsDAO = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await pool.query(showUserPlaylistsSql, [userId]);
        conn.release();
        return rows;
    } catch (error) {
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

// 플레이리스트명 변경하는 DAO
export const updatePlaylistNameDAO = async (playlistId, newTitle) => {
    try {
        const conn = await pool.getConnection();
        await pool.query(updatePlaylistNameSql, [newTitle, playlistId]);
        conn.release();
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG, 'Error updating playlist name');
    }
};

// 플레이리스트 내 곡 순서 변경하는 DAO
export const updateAndReorderSongsDAO = async (playlistId, songId, newOrder) => {
    try {
        const conn = await pool.getConnection();

        // 대상 노래의 순서를 업데이트
        await pool.query(updateSongOrderSql, [newOrder, playlistId, songId]);

        // rownum 초기화
        await pool.query("SET @rownum := 0;");

        // 모든 노래의 순서를 1부터 다시 정렬
        await pool.query(reorderSongsSql, [playlistId]);

        conn.release();
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG, 'Error updating and reordering songs');
    }
};