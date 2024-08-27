import express from "express";
import { imageUploader } from "../../config/s3.config";
import { response } from "../../config/response";
import { status } from "../../config/response.status";
import { s3Uploader } from "../services/s3.service";
export const sampleRoute = express.Router();


sampleRoute.get('/sample',async(req,res)=>{
    const result = await findSample(req,res);
})



//imageUploder.single은 middleWare 함수라 비동기적으로 처리해야함
sampleRoute.post('/upload', imageUploader.single('sample'), (req, res) => {
    //api가 실행되면, imageUploader.single (파일을 하나만 올릴수 있도록)함수가 실행되고, req.file이란 객체가 생성된다.
    if (!req.file) {
        return res.status(400).json({ error: 'File upload failed' });
    }
    console.log(req.file);
    //url 저장, 만약 함수를 따로 뺴서 사용할거면, 
    const url= req.file.location;
    res.json({ url: req.file.location });
});
//promise를 통해 함수화 한거
sampleRoute.post('/uploads', async(req,res)=>{
    res.send(response(status.SUCCESS,await s3Uploader(req,res)));

});



