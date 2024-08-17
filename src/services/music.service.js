import { BaseError } from "../../config/error.js";
import {status} from "../../config/response.status.js"
import { insertGenreDAO,insertLyricsDAO,insertMusicDAO,musicInfoDAO,deleteMusicDAO} from "../models/dao/music.dao.js";

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

// music 삭제 함수
// export const deleteMusicService = async (songId) =>{
//     try{
//         await deleteMusicDAO(songId);
//     } catch (error) {
//         console.error(error);
//         throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error delete music');
//     }
// };