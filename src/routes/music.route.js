import express from "express";
import { insertMusicController ,deleteMusicController, changeinfoMusicControler} from "../controllers/music.controller";
export const musicRoute= express.Router();

// music 생성하기
musicRoute.post('',async(req,res)=>{
    const result = await insertMusicController(req,res);
})

// music 삭제하기
musicRoute.delete('/:id',async(req,res)=>{
    const result = await deleteMusicController(req,res);
})

// musicinfo 수정하기
// musicRoute.post('/change-info',async(req,res)=>{
//     const result = await changeinfoMusicControler(req,res);
// })
