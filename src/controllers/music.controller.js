import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import  jwt  from "jsonwebtoken";


import { insertMusicService ,changeinfoMusicService, insertFavoriteService, deleteFavoriteService, isFavoriteService,musicInfoService, musicHistoryService,mySongService,deleteMusicService, findRandomService} from "../services/music.service.js";
import { MusicInsertRequestDTO , insertFavoriteRequestDTO, FavoriteRequestDTO, ChangeinfoMusicRequestDTO} from "../dtos/music.dto.js";



// music 생성 Controller
export const insertMusicController=async(req,res,next)=>{
    try{
        const time = new Date;
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(decoded);
        const userId = decoded.req.id;
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
        
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(decoded);
        const userId = decoded.req.id
  
      if (!userId) throw new BaseError(status.UNAUTHORIZED);
  
      const musicInfo = await musicInfoService(userId, req.params.id);
      res.status(status.SUCCESS.status).json(response(status.SUCCESS, musicInfo));
  
    } catch (error) {
      console.error(error);
  
      const errStatus = error instanceof BaseError ? error.status : status.BAD_REQUEST.status;
      res.status(errStatus).json(response(status.BAD_REQUEST));
    }
  };


// music change-info(update) Controller
export const changeinfoMusicController = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(decoded);
        const userId = decoded.req.id;
        const requestData = ChangeinfoMusicRequestDTO(req.body);
        console.log("컨트롤러 작동",requestData);
        res.send(response(status.SUCCESS,await changeinfoMusicService(userId, requestData)));
    } catch (error){
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
}

// music history 불러오는 Controller
export const musicHistoryController = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(decoded);
        const userId = decoded.req.id;
        const musicHistory = await musicHistoryService(userId);
        console.log("History 컨트롤러 작동", musicHistory);
        res.send(response(status.SUCCESS, musicHistory));
        } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
}

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
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
}


// music my-song 불러오는 Controller
export const getmySong = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(decoded);
        const userId = decoded.req.id;
        const mySong = await mySongService(userId);
        console.log("mySong 컨트롤러 작동", mySong);
        res.send(response(status.SUCCESS, mySong));
        } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
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
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
}

// music 삭제 컨트롤러
export const deleteMusicController = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];;
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(decoded)
        const userId = decoded.req.id;
        const deleteMusic = await deleteMusicService(userId, req.body.songId);
        res.send(response(status.SUCCESS, deleteMusic));
    } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
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
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
}

export const findRandomController = async(req,res,next)=>{
    try {
        res.send(response(status.SUCCESS,await findRandomService()));
    } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
}