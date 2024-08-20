import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import  jwt  from "jsonwebtoken";
import { insertMusicService ,changeinfoMusicService, insertFavoriteService, deleteFavoriteService, isFavoriteService} from "../services/music.service.js";
import { MusicInsertRequestDTO ,MusicChangeinfoRequestDTO, insertFavoriteRequestDTO, FavoriteRequestDTO} from "../dtos/music.dto.js";


// music 생성 Controller
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
};

// music info 불러오는 Controller
export const musicInfoController = async (req, res, next) => {
    try {
        const songId = req.params.id;

        const musicInfo = await musicInfoService(songId);
        res.send(response(status.SUCCESS, musicInfo));
    } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
};

export const insertFavoriteController = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(decoded)
        const userId = decoded.req.id
        const date = new Date();
        res.send(response(status.SUCCESS, await insertFavoriteService(insertFavoriteRequestDTO(userId,date,req.body))));
    } catch (error) {
        console.error(error);
        res.send(response.BaseError(status.BAD_REQUEST));
    }
}

export const deleteFavoriteController = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(decoded)
        const userId = decoded.req.id
        
        res.send(response(status.SUCCESS, await deleteFavoriteService(FavoriteRequestDTO(userId,req.body))));
    } catch (error) {
        console.error(error);
        res.send(response.BaseError(status.BAD_REQUEST));
    }
}

export const findFavoriteController = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(decoded)
        const userId = decoded.req.id
        
        res.send(response(status.SUCCESS, await isFavoriteService(FavoriteRequestDTO(userId,req.query))));
    } catch (error) {
        console.error(error);
        res.send(response.BaseError(status.BAD_REQUEST));
    }
}
