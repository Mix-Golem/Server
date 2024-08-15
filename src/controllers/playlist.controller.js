// 필요한 모듈과 서비스 함수를 가져옵니다.
import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import {insertPlaylistService, deletePlaylistService, playlistInfoService, addSongsToPlaylistService, showUserPlaylistsService, updatePlaylistNameService } from "../services/playlist.service.js";
import { PlaylistInsertRequestDTO } from "../dtos/playlist.dto.js";

// 플레이리스트 생성 Controller
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

// 사용자의 모든 플레이리스트 조회 컨트롤러
export const showUserPlaylistsController = async (req, res, next) => {
    try {
        const userId = req.params.userId; // 요청에서 userId를 가져옴

        const playlists = await showUserPlaylistsService(userId);
        res.send(response(status.SUCCESS, playlists));
    } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
};

// 플레이리스트 삭제 컨트롤러
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

// 플레이리스트 조회 Controller
export const playlistInfoController = async (req, res, next) => {
    try {
        const playlistId = req.params.id;

        const playlistInfo = await playlistInfoService(playlistId);
        res.send(response(status.SUCCESS, playlistInfo));
    } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
};

// 플레이리스트에 곡 추가 Controller
export const addSongsToPlaylistController = async (req, res, next) => {
    try {
        const playlistId = req.body.playlistId;
        const songs = req.body.songs;

        await addSongsToPlaylistService(playlistId, songs);
        res.send(response(status.SUCCESS, { message: 'Songs added to playlist successfully' }));
    } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST)));
    }
};

// 플레이리스트명 변경하는 controller
export const updatePlaylistNameController = async (req, res, next) => {
    try {
        const playlistId = req.params.id;  // URL에서 playlistId 획득
        const newTitle = req.body.title;   // 새로운 재생목록명 획득

        await updatePlaylistNameService(playlistId, newTitle);
        res.send(response(status.SUCCESS, { message: 'Playlist name updated successfully' }));
    } catch (error) {
        console.error(error);
        res.send(response(status.INTERNAL_SERVER_ERROR, 'Error updating playlist name'));
    }
};
