// insertMusicDAO(data);
// const insertLyricsData=await insertLyricsDAO(insertMusicData,lyrics);
// const insertGenreData = await insertGenreDAO

import { pool } from "../../../config/db.connect.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";

import { insertGenreSql,insertLyricsSql,insertMusicGenreSql,insertMusicSql,findGenreSql,getGenreSql, insertLikeSQL, deleteLikeSQL, isLikeSQL, findUserIdfromSongSQL, findNamefromUserId, insertAlarmSQL , findmusicInfoSql, findLyricsSQL, countFavoriteSQL, updateSongInfoSQL,findmusicHistorySql,findmySongSql,deleteLyricSql,deleteLikeSql,deletePlaylistSql,deleteMusicSql, deleteGenreSql} from "../sql/music.sql.js";


// music 생성하는 DAO
export const insertMusicDAO = async (data) => {
    try {
        const conn = await pool.getConnection();
        const music = await pool.query(insertMusicSql, [data.id, data.title, data.about, data.createdAt, data.media, 'F', data.thumbnail, data.prompt]);
        conn.release();
        return music[0].insertId;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// music 가사 생성하는 DAO
export const insertLyricsDAO = async (musicId, data) => {
    try {
        const conn = await pool.getConnection();
        const lyrics = await pool.query(insertLyricsSql, [musicId, data.lyric, data.startTime, data.endTime]);
        conn.release();
        return lyrics[0].insertId
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// music 장르 생성하는 DAO
export const insertGenreDAO = async (musicId, data) => {
    try {
        const conn = await pool.getConnection();
        const genreFind = await pool.query(findGenreSql, [data.type]);
        console.log("장르 찾기 여부", genreFind);
        if (genreFind === 1) {
            //장르가 존재하는걸 아니까 있는 데이터 가져오기
            const genreId = await pool.query(getGenreSql, [data.type]);
            const genre = await pool.query(insertMusicGenreSql, [genreId, musicId]);
        } else {
            const genreData = await pool.query(insertGenreSql, [data.type]);
            const genre = await pool.query(insertMusicGenreSql, [genreData[0].insertId, musicId]);
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
        const [rows] = await pool.query(findmusicInfoSql, [songId]);
        conn.release();
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 아티스트 데이터 찾아오는 DAO
export const artistInfoDAO = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await pool.query(findNamefromUserId, [userId]);
        conn.release();
        console.log(rows);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 가사 데이터 찾아오는 DAO
export const findLyricsDAO = async (songId) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await pool.query(findLyricsSQL, [songId]);
        console.log("가사데이터", rows);
        conn.release();
        return rows;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 좋아요 개수 찾아오는 DAO
export const countFavoriteDAO = async (songId) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await pool.query(countFavoriteSQL, [songId]);
        conn.release();
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};


// 노래 정보 업데이트 해주는 DAO
export const updateSongInfoDAO = async(changeData) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await pool.query(updateSongInfoSQL, [
            changeData.title,
            changeData.public,
            changeData.id
        ]);
        conn.release();
        return rows[0];
        } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

//좋아요 관련 DAO

export const insertFavoriteDAO = async (req) => {
    try {
        console.log(req);
        const conn = await pool.getConnection();
        const like =await pool.query(insertLikeSQL, [req.userId,req.songId,req.createdAt]);
        conn.release();
        return "success";
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


// 노래 히스토리 가져와주는 DAO
export const musicHistoryDAO = async (userId) => {
    try {
        console.log("히스토리!");
        const conn = await pool.getConnection();
        const [rows] = await pool.query(findmusicHistorySql, [userId]);
        console.log(rows)
        conn.release();
        return rows;
        } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const deleteFavoriteDAO = async (req)=>{
    try {
        const conn= await pool.getConnection();
        const like = await pool.query(deleteLikeSQL,[req.userId,req.songId]);
        conn.release();
        return "success";
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const isFavoriteDAO = async(req)=>{
    try{
        console.log(req);
        const conn= await pool.getConnection();
        const [rows] = await pool.query(isLikeSQL,[req.userId,req.songId]);
        console.log("찾기 여부",rows[0].success);
        conn.release();
        const isLike = rows[0].success;
        if(isLike===1){
            return false
        }else{
            return true
        }
        
    }catch(error){
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


export const findUserIdDAO = async(req)=>{
    try {
        const conn = await pool.getConnection();
        const [userId] = await pool.query(findUserIdfromSongSQL,[req.songId]);
        console.log("해당 유저 id",userId[0]);
        conn.release();

        return userId[0].user_id;

    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

};

// 나의 노래 가져와주는 DAO
export const mySongDAO = async (userId) => {
    try {
        console.log("나의 음악!");
        const conn = await pool.getConnection();
        const [rows] = await pool.query(findmySongSql, [userId]);
        console.log(rows)
        conn.release();
        return rows;
        } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}

export const findNamefromUserIdDAO = async(req)=>{
    try {
        const conn = await pool.getConnection();
        const [name] = await pool.query(findNamefromUserId,[req.userId]);
        console.log("누른 유저 이름",name[0].name);
        conn.release();

        return name[0].name;

    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

//music 삭제하는 DAO
export const deleteMusicDAO = async (userId, songId) =>{
    try {
        console.log("노래 id",songId)
        const conn = await pool.getConnection();
        const lyrics=await pool.query(deleteLyricSql, [songId]);
        const likes=await pool.query(deleteLikeSql, [songId]);
        const playlist= await pool.query(deletePlaylistSql, [songId]);
        const genre = await pool.query(deleteGenreSql,[songId]);
        const music=await pool.query(deleteMusicSql, [songId,userId]);
        
        conn.release();
    }catch (error){
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};


export const insertAlarmDAO =async(req)=>{
    try {
        const conn = await pool.getConnection();
        const name = await pool.query(insertAlarmSQL,[req.userId,req.content,req.createdAt,'LIKE',req.targetId]);
        
        conn.release();

        return "success";
    } catch (error) {
        console.error(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}