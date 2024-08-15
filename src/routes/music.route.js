import express from "express";
import { insertMusicController ,deleteMusicController, changeinfoMusicControler, insertFavoriteController, findFavoriteController, deleteFavoriteController} from "../controllers/music.controller";
export const musicRoute= express.Router();

// music 생성하기
musicRoute.post('',async(req,res)=>{
    const result = await insertMusicController(req,res);
})



// musicinfo 수정하기
// musicRoute.post('/change-info',async(req,res)=>{
//     const result = await changeinfoMusicControler(req,res);
// })

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

// music 삭제하기
musicRoute.delete('/:id',async(req,res)=>{
    const result = await deleteMusicController(req,res);
})