import { BaseError } from "../../config/error.js";
import {status} from "../../config/response.status.js"
import { insertGenreDAO,insertLyricsDAO,insertMusicDAO,deleteMusicDAO, insertFavoriteDAO, deleteFavoriteDAO, isFavoriteDAO, findUserIdDAO, insertAlarmDAO, findNamefromUserIdDAO} from "../models/dao/music.dao.js";
import { findNamefromUserId, findUserIdfromSongSQL } from "../models/sql/music.sql.js";

// music을 생성하는 함수
export const insertMusicService=async(data)=>{
    const lyrics=data.lyrics;
    const genres = data.genre;

    const insertMusicData= await insertMusicDAO(data);
    for(let i =0; i<lyrics.length;i++){
        const lyric={
            lyric : lyrics[i].content,
            startTime : lyrics[i].startTime,
            endTime : lyrics[i].endTime
        }
        const insertLyricsData=await insertLyricsDAO(insertMusicData,lyric);
    }
    for(let i =0; i<genres.length;i++){
        const genre={
            type: genres[i]
        }
        const insertGenreData = await insertGenreDAO(insertMusicData,genre);
    }
    
    return insertMusicData;
};

// music 조회 함수
export const musicInfoService = async (songId) => {
    try {
        const musicInfo = await musicInfoDAO(songId);
        return musicInfo;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error fetching music info');
    }
};


//좋아요 관련 서비스

export const insertFavoriteService= async(req)=>{
        //좋아요테이블 등록
        const isLike = await insertFavoriteDAO(req);
        //알림 보내기 위해 필요한 로직
        const userId=await findUserIdDAO(req);
        const userName=await findNamefromUserIdDAO(req);
        const alarmData = await insertAlarmDAO({
            userId:userId,
            content: userName+'이 좋아요를 눌렀습니다.',
            createdAt : req.createdAt,
            targetId:req.userId
        });

        return isLike;

    
}

export const deleteFavoriteService = async(req)=>{
    try {
        const deleteLike = await deleteFavoriteDAO(req);
        return deleteLike;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const isFavoriteService = async (req)=>{
    try {
        const isLike = await isFavoriteDAO(req);
        return isLike;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }

}
