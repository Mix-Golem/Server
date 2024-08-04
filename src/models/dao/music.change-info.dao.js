import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";
import { insertGenreSql,insertLyricsSql,insertMusicGenreSql,insertMusicSql,findGenreSql,getGenreSql } from "../sql/music.sql.js";

export const changeMusicDAO=async(data)=>{
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

export const changeLyricsDAO=async(musicId,data)=>{
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

export const changeGenreDAO=async(musicId,data)=>{
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