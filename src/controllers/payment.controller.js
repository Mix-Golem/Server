import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { viewPaylogService,viewProductService,buyProductService } from "../services/payment.service.js";

export const viewProductController= async(res)=>{

    try{
        res.send(response(status.SUCCESS,await viewProductService()));

    }catch(error){
        console.error(error);
        res.send(response.BaseError(status.BAD_REQUEST));
    }
}

export const buyProductController = async(req,res)=>{
    try {
        const time = new Date;
        const token = req.header.authorization.split(' ')[1];
        const userId=decodeTokenToId(token);
        const requestData= buyProductRequestDTO(userId,req.body,time);
        res.send(response(status.SUCCESS, await buyProductService(requestData)));
    } catch (error) {
        console.error(error);
        res.send(response.BaseError(status.BAD_REQUEST));
    }
}

export const viewPaylogController = async(req,res)=>{
    try {
        
        const token = req.header.authorization.split(' ')[1];
        const userId=decodeTokenToId(token);
        res.send(response(status.SUCCESS, await viewPaylogService(userId)));
    } catch (error) {
        console.error(error);
        res.send(response.BaseError(status.BAD_REQUEST));
    }
}
async function decodeTokenToId(token){
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
}