import { BaseError } from "../../config/error.js";



import {status} from "../../config/response.status.js"
import { insertGenreDAO,insertLyricsDAO,insertMusicDAO,deleteMusicDAO, musicInfoDAO,artistInfoDAO, musicHistoryDAO,  countFavoriteDAO, findLyricsDAO, updateSongInfoDAO,mySongDAO,insertFavoriteDAO, deleteFavoriteDAO, isFavoriteDAO, findUserIdDAO, insertAlarmDAO, findNamefromUserIdDAO} from "../models/dao/music.dao.js";
import { findLyricsResponseDTO, findMusicInfoResponseDTO ,findMusicHistoryResponseDTO} from '../dtos/music.dto.js'
import { findNamefromUserId, findUserIdfromSongSQL , } from "../models/sql/music.sql.js";


// music을 생성하는 함수
export const insertMusicService = async (data) => {
    const lyrics = data.lyrics;
    const genres = data.genre;
    const insertMusicData = await insertMusicDAO(data);
    for (let i = 0; i < lyrics.length; i++) {
        const lyric = {
            lyric: lyrics[i].content,
            startTime: lyrics[i].startTime,
            endTime: lyrics[i].endTime
        }
        const insertLyricsData = await insertLyricsDAO(insertMusicData, lyric);
    }
    for (let i = 0; i < genres.length; i++) {
        const genre = {
            type: genres[i]
        }
        const insertGenreData = await insertGenreDAO(insertMusicData, genre);
    }
    return insertMusicData;
};

// music 조회 함수
export const musicInfoService = async (userId, songId) => {
    try {
        //곡 전체 데이터
        const musicInfo = await musicInfoDAO(songId);
        const artistData = await artistInfoDAO(userId);
        const countData = await countFavoriteDAO(songId);
        const lyrics = await findLyricsDAO(songId);
        const lyricsData = [];
        for (let i = 0; i < lyrics.length; i++) {
            lyricsData.push(findLyricsResponseDTO(lyrics[i]));
        }
        return findMusicInfoResponseDTO(lyricsData, countData, artistData, musicInfo);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error fetching music info');
    }
};


// music change-info(update) 함수
export const changeinfoMusicService = async (userId, changeData) => {
    const songUserId = await musicInfoDAO(changeData.id).userId
    if (userId != songUserId) {
        // 에외처리 or return값을 어떻게 정해서 controller에서 response status 저기에 뭔가 추가를 하거나 해서
        // 잘못되었다는 response를 프론트에 주면 돼
        // TODO 예외처리 로직 추가하기
    }
    if (changeData.public) {
        changeData.public = 1
    } else {
        changeData.public = 0
    }
    await updateSongInfoDAO(changeData);
    return null
}

// music History 불러오는 함수
export const musicHistoryService = async (userId) => {
    try{
        const historyData = await musicHistoryDAO(userId);
        const historyDatas = [];
        for (let i = 0; i < historyData.length; i++) {
            historyDatas.push(findMusicHistoryResponseDTO(historyDatas[i]));
        }
        return findMusicHistoryResponseDTO(historyData);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error fetching music history');
    }
}

//music mySong 불러오는 함수
export const mySongService = async (userId) => {
    try{
        const mySongData = await mySongDAO(userId);
        const result = []
        for(let i =0; i<mySongData.length;i++){
            result.push(await musicInfoService(userId,mySongData[i].id));
        }
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error fetching music my-song');
    }
}
// music 삭제 함수
export const deleteMusicService = async (userId, songId) =>{
    try{
        await deleteMusicDAO(userId, songId);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error delete music');
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
