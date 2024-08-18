// insertMusicDAO(data);
// const insertLyricsData=await insertLyricsDAO(insertMusicData,lyrics);
// const insertGenreData = await insertGenreDAO

import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import { insertGenreSql,insertLyricsSql,insertMusicGenreSql,insertMusicSql,findGenreSql,getGenreSql } from "../sql/music.sql.js";

// music 생성하는 DAO
export const insertMusicDAO=async(data)=>{
    try{
        const conn = await pool.getConnection();
        const music= await pool.query(insertMusicSql,[data.id,data.title,data.about,data.createdAt,data.media,'F',data.thumbnail,data.prompt]);
        conn.release();
        return music[0].insertId;
    }catch (error){
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
    
}

// music 가사 생성하는 DAO
export const insertLyricsDAO=async(musicId,data)=>{
    try {
        const conn = await pool.getConnection();
        
        const lyrics =await pool.query(insertLyricsSql,[musicId,data.lyric,data.startTime,data.endTime]);
        conn.release();
        return lyrics[0].insertId
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// music 장르 생성하는 DAO
export const insertGenreDAO=async(musicId,data)=>{
    try {
        const conn = await pool.getConnection();
        const genreFind = await pool.query(findGenreSql,[data.type]);
        console.log("장르 찾기 여부",genreFind);
        if(genreFind===1){
            //장르가 존재하는걸 아니까 있는 데이터 가져오기
            const genreId=await pool.query(getGenreSql,[data.type]);
            const genre= await pool.query(insertMusicGenreSql,[genreId,musicId]);
        }else{
            const genreData=await pool.query(insertGenreSql,[data.type]);
            const genre= await pool.query(insertMusicGenreSql,[genreData[0].insertId,musicId]);
        } 
        conn.release();
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// music 조회 DAO
export const musicInfoDAO = async (songId) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await pool.query(musicInfoSql, [songId]);
        conn.release();
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// music 삭제하는 DAO
// export const deleteMusicDAO = async (songId) =>{
//     try {
//         const conn = await pool.getConnection();
//         await pool.query(deleteMusicSql, [songId]);
//         conn.release;
//     }catch (error){
//         console.error(error);
//         throw new BaseError(status.PARAMETER_IS_WRONG);
//     }
// };