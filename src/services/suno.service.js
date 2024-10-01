import axios from "axios";
import { sunoResponseDTO } from "../dtos/suno.dto";
import { musicUploader } from "../../config/s3.config";



const baseUrl= "http://suno.mixgolem.site"

export const sunoService=async (req)=>{
    try{
        console.log("서비스 실행");
        const url=`${baseUrl}/api/generate`;
        const response = await axios.post(url,{
            "prompt":req.prompt,
            "make_instrumental": false,
            "wait_audio": true
        },{
            headers : {"Content-Type": "application/json"},
        });
        // console.log(response.data);
        const s3Url = await musicUploader(response.data[0].audio_url);
        console.log("s3url: "+s3Url)
        return await sunoResponseDTO(response.data[0],s3Url);
    }catch(error){
        console.error(error);
    }
    

};