import { BaseError } from "../../config/error.js";
import {status} from "../../config/response.status.js"
import { insertGenreDAO,insertLyricsDAO,insertMusicDAO,deleteMusicDAO, insertFavoriteDAO, deleteFavoriteDAO, isFavoriteDAO} from "../models/dao/music.dao.js";

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

// music 삭제 함수
export const deleteMusicService = async (songId) =>{
    try{
        await deleteMusicDAO(songId);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error delete music');
    }
};


//좋아요 관련 서비스

export const insertFavoriteService= async(req)=>{
    
        const isLike = await insertFavoriteDAO(req);
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