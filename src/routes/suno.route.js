import express from "express";
import { sunoController } from "../controllers/suno.controller";

export const sunoRoute = express.Router();


sunoRoute.post('',async(req,res)=>{
    await sunoController(req,res);
})