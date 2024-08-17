import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import  jwt  from "jsonwebtoken";
import { insertMusicService ,musicInfoService, changeinfoMusicService} from "../services/music.service.js";
import { MusicInsertRequestDTO} from "../dtos/music.dto.js";


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
