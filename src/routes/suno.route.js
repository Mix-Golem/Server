import express from "express";
import { sunoController } from "../controllers/suno.controller";
import { status } from "../../config/response.status";
import { response } from "../../config/response";

export const sunoRoute = express.Router();


sunoRoute.post('/', async (req, res) => {
    console.log("라우터 실행됨. 요청된 데이터:", req.body);
    try {
        const result = await sunoController(req, res);

    } catch (error) {
        console.error("Error in /suno route:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

sunoRoute.get('/123',async(req,res)=>{
    try {
        res.send(response(status.SUCCESS,{"result":"success"}));

    } catch (error) {
        console.error("Error in /suno route:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
})