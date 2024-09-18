// index.js

import express from 'express';


import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';

import { response } from './config/response.js';
import { BaseError } from './config/error.js';
import { status } from './config/response.status.js';

import { sampleRoute } from './src/routes/sample.route.js';

import {playlistRoute} from "./src/routes/playlist.route";

import { socialRoute } from './src/routes/social.route.js';

import { usersRoute } from "./src/routes/users.route.js";
import bodyParser from "body-parser";
import { musicRoute } from './src/routes/music.route.js';

import { imageUploader } from './config/s3.config.js';
import { sunoRoute } from './src/routes/suno.route.js';







dotenv.config();    // .env 파일 사용 (환경 변수 관리)

const app = express();

// server setting - veiw, static, body-parser etc..
app.set("port", process.env.PORT || 3000); // 서버 포트 지정

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(bodyParser.json());

// ================================
// route 추가하는 칸
// ================================

app.use("/sample", sampleRoute);

// users
app.use("/users", usersRoute);

// root
app.get("/", (req, res) => {
	res.status(200).json({
		status: 200,
		isSuccess: true,
		message: "루트 페이지!",
		result: null,
	});
});


app.use('/music/playlist', playlistRoute);





app.use('/social', socialRoute);


app.use('/sample', sampleRoute);
app.use('/music', musicRoute);

app.use('/suno',sunoRoute);

//sample은 업로드할때 쓰는 file key 값 



// error handling
app.use((req, res, next) => {
	const err = new BaseError(status.NOT_FOUND);
	next(err);
});

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    console.error(err);
    res.status(status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

//sample
app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);

});
