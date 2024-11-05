// service에서 실제 구현해야 하는 로직 구현
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {deletePlayListDAO, insertPlaylistDAO, playlistInfoDAO,
    addSongsToPlaylistDAO, showUserPlaylistsDAO, updatePlaylistNameDAO,
    updateAndReorderSongsDAO, reorderSongsDAO, deleteAndReorderSongsDAO, getCurrentMaxOrderDAO} from "../models/dao/playlist.dao.js";

// 플레이리스트를 생성하는 함수
export const insertPlaylistService = async (requestData) => {
    // DAO 함수통해 DB에 위에 playlistData 삽입
    try {
        const insertPlaylistData = await insertPlaylistDAO(requestData);
        return insertPlaylistData;
    } catch (error) { // 예외처리
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error creating playlist');
    }
};

// 플레이리스트 삭제 함수
export const deletePlaylistService = async (playlistId) =>{
    try{
        await deletePlayListDAO(playlistId);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error delete playlist');
    }
};

// 유저의 모든 플레이리스트 조회 함수
export const showUserPlaylistsService = async (userId) => {
    try {
        const playlists = await showUserPlaylistsDAO(userId);
        console.log("서비스"+ playlists)
        return playlists;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error fetching user playlists');
    }
};

// 플레이리스트 조회 함수
export const playlistInfoService = async (playlistId) => {
    try {
        // 노래의 순서를 1부터 재정렬
        await reorderSongsDAO(playlistId);

        // 재정렬된 플레이리스트 정보를 가져옴
        const playlistInfo = await playlistInfoDAO(playlistId);

        return playlistInfo;
    } catch (error) {
        console.error('Error fetching playlist info:', error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

// 플레이리스트에 곡 추가 함수
export const addSongsToPlaylistService = async (playlistId, songId) => {
    try {
        // 현재 플레이리스트에서 가장 높은 순서를 가져옵니다.
        const currentMaxOrder = await getCurrentMaxOrderDAO(playlistId);
        const newOrder = currentMaxOrder + 1; // 마지막 순서보다 1 크게 설정

        // DAO에서 노래를 추가하도록 요청합니다.
        await addSongsToPlaylistDAO(playlistId, songId, newOrder);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error adding song to playlist');
    }
};

// 플레이리스트명 변경하는 서비스 함수
export const updatePlaylistNameService = async (playlistId, newTitle) => {
    try {
        await updatePlaylistNameDAO(playlistId, newTitle);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error updating playlist name');
    }
};

// 플레이리스트 노래 순서 변경하는 서비스 함수(모든 노래의 순서를 1부터 재정렬)
export const updateAndReorderSongsService = async (playlistId, songId, newOrder) => {
    try {
        await updateAndReorderSongsDAO(playlistId, songId, newOrder);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error updating and reordering songs');
    }
};

export const reorderSongsService = async (playlistId) => {
    try {
        // 노래 순서 재정렬 DAO 호출
        await reorderSongsDAO(playlistId);
    } catch (error) {
        console.error('Error in reorderSongsService:', error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

// 플레이리스트에서 곡 삭제 service
export const deleteAndReorderSongsService = async (playlistId, songId) => {
    try {
        await deleteAndReorderSongsDAO(playlistId, songId);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error deleting and reordering songs');
    }
};