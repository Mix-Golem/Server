// 필요한 모듈과 서비스 함수를 가져옵니다.
import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { insertPlaylistService, deletePlaylistService } from "../services/playlist.service.js";
import { PlaylistInsertRequestDTO } from "../dtos/playlist.dto.js";

// controller 함수
export const insertPlaylistController = async (req, res, next) => {
    try {
        const time = new Date()
        // 토큰에서 사용자 ID를 복호화 하기 위해 필요한 코드(필요시 주석 해제)
        // const token = req.headers.authorization.split(' ')[1];
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = 1; // 임시로 고정된 사용자 ID를 사용합니다.

        // 요청 데이터를 DTO를 통해 가공
        const requestData = PlaylistInsertRequestDTO(userId, req.body, time);
        console.log("플레이리스트 생성 컨트롤러 작동", requestData);

        // insertPlayListService 함수 통해 플레이리스트를 생성
        res.send(response(status.SUCCESS, await insertPlaylistService(requestData)));

    } catch (error) { // 에러 처리
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
};

export const deletePlaylistController = async (req, res, next) => {
    try {
        const playlistId = req.params.id;

        // 서비스 함수 호출 -> 플레이리스트 삭제
        await deletePlaylistService(playlistId);
        res.send(response(status.SUCCESS, {message: 'Playlist delete Success'}));
    } catch (error){ // 오류 발생 : 로그 출력, 에러 응답 전송
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
};