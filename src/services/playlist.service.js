// service에서 실제 구현해야 하는 로직 구현
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {deletePlayListDAO, insertPlaylistDAO, playlistInfoDAO, addSongsToPlaylistDAO, showUserPlaylistsDAO, updatePlaylistNameDAO, updateAndReorderSongsDAO} from "../models/dao/playlist.dao.js";

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
        return playlists;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error fetching user playlists');
    }
};

// 플레이리스트 조회 함수
export const playlistInfoService = async (playlistId) => {
    try {
        const playlistInfo = await playlistInfoDAO(playlistId);
        return playlistInfo;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error fetching playlist info');
    }
};

// 플레이리스트에 곡 추가 함수
export const addSongsToPlaylistService = async (playlistId, songs) => {
    try {
        await addSongsToPlaylistDAO(playlistId, songs);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error adding songs to playlist');
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