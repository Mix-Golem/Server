import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import {deletePlaylistSql, insertPlaylistSql, playlistInfoSql, addSongsToPlaylistSql,
    getCurrentMaxOrderSql,showUserPlaylistsSql, updatePlaylistNameSql,
    updateSongOrderSql, reorderSongsSql} from "../sql/playlist.sql.js";

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

        // 현재 재생목록에서 최대 순서를 가져옵니다.
        const [orderResult] = await conn.query(getCurrentMaxOrderSql, [playlistId]);
        let currentOrder = orderResult[0].maxOrder;

        // 각 곡을 마지막 순서에 추가합니다.
        for (const song of songs) {
            const { song_id } = song;

            // 순서를 1씩 증가시키면서 곡을 추가합니다.
            currentOrder++;
            await conn.query(addSongsToPlaylistSql, [playlistId, song_id, currentOrder]);
        }

        conn.release();
    } catch (error) {
        console.error('Error adding songs to playlist:', error);
        throw new BaseError(status.PARAMETER_IS_WRONG, 'Error adding songs to playlist');
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

        // 노래 순서 업데이트
        await pool.query(updateSongOrderSql, [newOrder, playlistId, songId]);

        // row_num 초기화
        await pool.query("SET @rownum := 0;");

        // 모든 노래의 순서를 1부터 다시 정렬
        await pool.query(`
            UPDATE SONG_PLAYLIST_INFO
            SET \`order\` = (@rownum := @rownum + 1)
            WHERE playlist_id = ?
            ORDER BY \`order\`;
        `, [playlistId]);

        conn.release();
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG, 'Error updating and reordering songs');
    }
};

export const reorderSongsDAO = async (playlistId) => {
    try {
        const conn = await pool.getConnection();

        // rownum을 초기화합니다.
        await conn.query('SET @rownum := 0;');

        // 노래 순서를 재정렬하는 쿼리 실행
        await conn.query(reorderSongsSql, [playlistId]);

        conn.release();
    } catch (error) {
        console.error('Error reordering songs:', error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};