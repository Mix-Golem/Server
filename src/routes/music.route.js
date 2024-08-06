import express from "express";
import { insertMusicController ,changeinfoMusicControler} from "../controllers/music.controller";
export const musicRoute= express.Router();

musicRoute.post('',async(req,res)=>{
    const result = await insertMusicController(req,res);
})
musicRoute.post('/change-info',async(req,res)=>{
    const result = await changeinfoMusicControler(req,res);
}
)
