import express from "express";
import { insertMusicController ,
    musicInfoController, 
        deleteMusicController,
        changeinfoMusicControler} from "../controllers/music.controller";
export const musicRoute= express.Router();

// music 생성하기
musicRoute.post('',async(req,res)=>{
    await insertMusicController(req,res);
})

// music info 불러오기
musicRoute.get("/info/:id", async (req,res)=>{
    const result = await musicInfoController(req,res);
})

// music 삭제하기
// musicRoute.delete('/:id',async(req,res)=>{
//     await deleteMusicController(req,res);
// })

// musicinfo 수정하기
// musicRoute.post('/change-info',async(req,res)=>{
//     await changeinfoMusicControler(req,res);
// })
