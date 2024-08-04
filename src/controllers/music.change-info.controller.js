import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import  jwt  from "jsonwebtoken";
import { changeinfoMusicService } from "../services/music.change-info.service.js";
import { MusicChangeinfoRequestDTO } from "../dtos/music.change-info.dto.js";
export const changeinfoMusicController=async(req,res,next)=>{
    try{
        const time = new Date;
        // const token = req.headers.authorization.split(' ')[1];
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = 1
        const requestData= MusicChangeinfoRequestDTO(userId,req.body,time);
        console.log("컨트롤러 작동",requestData);
        res.send(response(status.SUCCESS,await changeinfoMusicService(requestData)));
    }catch(error){
        console.error(error);
        res.send(response.BaseError(status.BAD_REQUEST));
    }
}