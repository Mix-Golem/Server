import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { checkFormat } from "../middleware/jwt.js";
import { sunoService } from "../services/suno.service.js";




export const sunoController = async (req,res)=>{
    try{
        console.log("컨틀롤러 실행");
        res.send(response(status.SUCCESS, await sunoService(req.body)));
        // const token = await checkFormat(req.get("Authorization"));

        // if(token !== null){
        //     res.send(response(status.SUCCESS, await sunoService(req.body)));
        // }else{
        //     res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
        // }
    }catch(err){
        console.error(err);
        res.send(response(BaseError));
    }
}


