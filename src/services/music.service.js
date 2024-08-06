import { BaseError } from "../../config/error.js";
import {status} from "../../config/response.status.js"
import { insertGenreDAO,insertLyricsDAO,insertMusicDAO } from "../models/dao/music.dao.js";
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
}

export const changeinfoMusicService=async(data)=>{
    const publics=data.public;
    const genres = data.genre;

    const changeinfoMusicData= await changeinfoMusicDAO(data);
    for(let i =0; i<publics.length;i++){
        const publict={
            type : publics[i]
        }
        const changeinfoPublicData=await changeinfoPublicDAO(changeinfoMusicData,publict);
    }
    for(let i =0; i<genres.length;i++){
        const genre={
            type: genres[i]
        }
        const changeinfoGenreData = await changeinfoGenreDAO(changeinfoMusicData,genre);
    }
    
    return changeinfoMusicData;
}