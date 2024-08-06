import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import  jwt  from "jsonwebtoken";
import { insertMusicService ,changeinfoMusicService} from "../services/music.service.js";
import { MusicInsertRequestDTO ,MusicChangeinfoRequestDTO} from "../dtos/music.dto.js";
export const insertMusicController=async(req,res,next)=>{
    try{
        const time = new Date;
        // const token = req.headers.authorization.split(' ')[1];
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = 1
        const requestData= MusicInsertRequestDTO(userId,req.body,time);
        console.log("컨트롤러 작동",requestData);
        res.send(response(status.SUCCESS,await insertMusicService(requestData)));
    }catch(error){
        console.error(error);
        res.send(response.BaseError(status.BAD_REQUEST));
    }
}
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