import express from "express";

export const sampleRoute = express.Router();


sampleRoute.get('/sample',async(req,res)=>{
    const result = await findSample(req,res);
})
