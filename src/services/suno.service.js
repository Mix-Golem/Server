import axios from "axios";
import { sunoResponseDTO } from "../dtos/suno.dto";



const baseUrl= "http://suno.mixgolem.site"

export const sunoService=async (req)=>{
    
    const url=`${baseUrl}/api/generate`;
    const response = await axios.post(url,{
        "prompt":req.prompt,
        "make_instrumental": false,
        "wait_audio": true
    },{
        headers : {"Content-Type": "application/json"},
    });
    console.log(response.data);

    return sunoResponseDTO(response.data[0]);

};