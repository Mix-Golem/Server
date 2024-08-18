import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js"
import  jwt  from "jsonwebtoken";
import { sampleRequestDto } from "../dtos/sample.dto.js";
import { getSample } from "../services/sample.service.js";

export const findSample = async (req,res,next)=>{
    try{
        const requestData= await sampleRequestDto(req);
        
        //dto 객체 가져오기
       res.send(response(status.SUCCESS,await getSample(requestData)));

    }catch(error){
        res.send(response(status.BaseError));
    }
}