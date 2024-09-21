import express from "express";
import { sunoController } from "../controllers/suno.controller";

export const sunoRoute = express.Router();


sunoRoute.post('',async(req,res)=>{
    console.log("라우터 실행");
    const result= await sunoController(req,res);
})