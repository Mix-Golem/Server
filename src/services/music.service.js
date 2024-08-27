import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js"
import { findLyricsResponseDTO, findMusicInfoResponseDTO ,findMusicHistoryResponseDTO} from "../dtos/music.dto.js";
import { insertGenreDAO, insertLyricsDAO, insertMusicDAO, musicInfoDAO, musicHistoryDAO, deleteMusicDAO, countFavoriteDAO, findLyricsDAO, updateSongInfoDAO,mySongDAO} from "../models/dao/music.dao.js";

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
export const musicInfoService = async (songId) => {
    try {
        //곡 전체 데이터
        const musicInfo = await musicInfoDAO(songId);
        const countData = await countFavoriteDAO(songId);
        const lyrics = await findLyricsDAO(songId);
        const lyricsData = [];
        for (let i = 0; i < lyrics.length; i++) {
            lyricsData.push(findLyricsResponseDTO(lyrics[i]));
        }
        return findMusicInfoResponseDTO(lyricsData, countData, musicInfo);
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
            result.push(await musicInfoService(mySongData[i].id));
        }
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error fetching music my-song');
    }
}
// music 삭제 함수
// export const deleteMusicService = async (songId) =>{
//     try{
//         await deleteMusicDAO(songId);
//     } catch (error) {
//         console.error(error);
//         throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error delete music');
//     }
// };