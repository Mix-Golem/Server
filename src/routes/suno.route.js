import express from "express";
import { sunoController } from "../controllers/suno.controller";

export const sunoRoute = express.Router();


sunoRoute.post('', async (req, res) => {
    console.log("라우터 실행");
    try {
        const result = await sunoController(req, res);
        res.json(result);
    } catch (error) {
        console.error("Error in /suno route:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});