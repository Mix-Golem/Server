// 필요한 모듈과 서비스 함수를 가져옵니다.
import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import {insertPlaylistService, deletePlaylistService, playlistInfoService,
    addSongsToPlaylistService, showUserPlaylistsService, updatePlaylistNameService,
    updateAndReorderSongsService, deleteAndReorderSongsService } from "../services/playlist.service.js";

import { PlaylistInsertRequestDTO } from "../dtos/playlist.dto.js";

// 플레이리스트 생성 Controller
export const insertPlaylistController = async (req, res, next) => {
    try {
        const time = new Date()
        // 토큰에서 사용자 ID를 복호화 하기 위해 필요한 코드(필요시 주석 해제)
        // const token = req.headers.authorization.split(' ')[1];
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = req.userId; // 임시로 고정된 사용자 ID를 사용합니다.

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
        const userId = req.userId; // 미들웨어에서 추출된 userId 사용
        console.log(userId);
        console.log("컨틀롤러");
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
        const playlistId = req.userId;

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
export const addSongsToPlaylistController = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { songId } = req.body;

        await addSongsToPlaylistService(playlistId, songId);

        res.send(response(status.SUCCESS, "Song added to playlist successfully"));
    } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST, 'Error adding song to playlist')));
    }
};

// 플레이리스트명 변경하는 controller
export const updatePlaylistNameController = async (req, res, next) => {
    try {
        const playlistId = req.params.id;  // URL에서 playlistId 가져옴
        const newTitle = req.body.title;   // 새로운 재생목록명 가져옴

        await updatePlaylistNameService(playlistId, newTitle);
        res.send(response(status.SUCCESS, { message: 'Playlist name updated successfully' }));
    } catch (error) {
        console.error(error);
        res.send(response(status.INTERNAL_SERVER_ERROR, 'Error updating playlist name'));
    }
};

// 플레이리스트 노래 순서 변경하는 controller
export const updateAndReorderSongsController = async (req, res, next) => {
    try {
        const playlistId = req.params.playlistId;  // URL에서 playlistId를 가져옵니다.
        const songId = req.body.songId;  // 요청 본문에서 songId를 가져옵니다.
        const newOrder = req.body.order;  // 요청 본문에서 새로운 순서를 가져옵니다.

        await updateAndReorderSongsService(playlistId, songId, newOrder);
        res.send(response(status.SUCCESS, { message: 'Song order updated and reordered successfully' }));
    } catch (error) {
        console.error(error);
        res.send(response(status.INTERNAL_SERVER_ERROR, 'Error updating and reordering songs'));
    }
};

// 플레이리스트에서 곡 삭제 controller
export const deleteAndReorderSongsController = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;

        await deleteAndReorderSongsService(playlistId, songId);

        res.send(response(status.SUCCESS, "Song deleted and playlist reordered successfully"));
    } catch (error) {
        console.error(error);
        res.send(response(status.BAD_REQUEST, BaseError(status.BAD_REQUEST, 'Error deleting and reordering songs')));
    }
};