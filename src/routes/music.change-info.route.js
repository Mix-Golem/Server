import express from "express";
import { changeinfoMusicController } from "../controllers/music.change-info.controller";
export const musicchangeinfoRoute= express.Router();

musicchangeinfoRoute.post('/change-info',async(req,res)=>{
    const result = await changeinfoMusicController(req,res);
})