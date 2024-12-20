import express from "express";
import { verify } from "../middleware/jwt";
import { insertMusicController ,
        musicInfoController, 
        deleteMusicController,
        musicHistoryController,
        changeinfoMusicController,
        getmySong,
        findRandomController} from "../controllers/music.controller";

import {  insertFavoriteController, findFavoriteController, deleteFavoriteController} from "../controllers/music.controller";

export const musicRoute= express.Router();
// music 생성하기
musicRoute.post('',async(req,res)=>{
    await insertMusicController(req,res);
})

// music info 불러오기
musicRoute.get("/info/:id", async (req,res)=>{
    const result = await musicInfoController(req,res);
})

// music info 수정하기
musicRoute.post("/change-info", async (req,res)=>{
    await changeinfoMusicController(req,res);
})

// music history 불러오기
musicRoute.get("/history", async (req,res)=>{
    await musicHistoryController(req,res);
})

musicRoute.get("/my-song", async (req,res)=> {
    await getmySong(req,res);
})
//music 삭제하기
musicRoute.delete('',async(req,res)=>{
    await deleteMusicController(req,res);
})

//좋아요 관련 기능
musicRoute.post('/like',async(req,res)=>{
    const result = await insertFavoriteController(req,res);
})

musicRoute.delete('/disLike',async(req,res)=>{
    const result = await deleteFavoriteController(req,res);
})

musicRoute.get('/like',async(req,res)=>{
    const result = await findFavoriteController(req,res);
})

musicRoute.get('/random',async(req,res)=>{
    const reuslt = await findRandomController(req,res);
})