import { BaseError } from "../../config/error.js";
import {status} from "../../config/response.status.js"
import { getSampleResponseDTO } from "../dtos/sample.dto.js";

export const getSample=async (req)=>{
    //데이터베이스를 쓰는게 아니므로 dao 사용 안함
    return getSampleResponseDTO(req);
}