import express from "express";
import { insertMusicController } from "../controllers/music.controller";
export const musicRoute= express.Router();

musicRoute.post('',async(req,res)=>{
    const result = await insertMusicController(req,res);
})