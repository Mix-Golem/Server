import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import  jwt  from "jsonwebtoken";
import { insertMusicService ,musicInfoService, changeinfoMusicService,musicHistoryService} from "../services/music.service.js";
import { MusicInsertRequestDTO, ChangeinfoMusicRequestDTO} from "../dtos/music.dto.js";


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
        const userId = decoded.req.id;
        const songId = req.params.id;
        const musicInfo = await musicInfoService(songId);
        res.send(response(status.SUCCESS, musicInfo));
    } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
};

// music change-info(update) Controller
export const changeinfoMusicController = async (req, res, next) => {
    try {
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
    } catch {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
}
// music 삭제 컨트롤러
// export const deleteMusicController = async(req,res,next)=>{
//     try{
//         const songId = req.params.id;

//         // 서비스 함수 호출 -> music 삭제
//         await deleteMusicService(songId);
//         res.send(response(status.SUCCESS, {message: 'Music delete Success'}));
//     } catch (error) {
//         console.error(error);
//         res.send(response.BaseError(status.BAD_REQUEST));
//     }
// };
