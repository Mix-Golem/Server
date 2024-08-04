import { BaseError } from "../../config/error.js";
import {status} from "../../config/response.status.js"
import { changeGenreDAO,changeLyricsDAO,changeMusicDAO } from "../models/dao/music.change-info.dao.js";
export const insertMusicService=async(data)=>{
    const lyrics=data.lyrics;
    const genres = data.genre;

    const changeMusicData= await changeMusicDAO(data);
    for(let i =0; i<lyrics.length;i++){
        const lyric={
            lyric : lyrics[i].content,
            startTime : lyrics[i].startTime,
            endTime : lyrics[i].endTime
        }
        const changeLyricsData=await changeLyricsDAO(changeMusicData,lyric);
    }
    for(let i =0; i<genres.length;i++){
        const genre={
            type: genres[i]
        }
        const changeGenreData = await changeGenreDAO(changeMusicData,genre);
    }
    
    return insertMusicData;

}