// service에서 실제 구현해야 하는 로직 구현
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {deletePlayListDAO, insertPlaylistDAO, playlistInfoDAO, addSongsToPlaylistDAO} from "../models/dao/playlist.dao.js";

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

export const deletePlaylistService = async (playlistId) =>{
    try{
        await deletePlayListDAO(playlistId);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error delete playlist');
    }
};

// 플레이리스트 조회 서비스
export const playlistInfoService = async (playlistId) => {
    try {
        const playlistInfo = await playlistInfoDAO(playlistId);
        return playlistInfo;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error fetching playlist info');
    }
};

// 플레이리스트에 곡 추가 service
export const addSongsToPlaylistService = async (playlistId, songs) => {
    try {
        await addSongsToPlaylistDAO(playlistId, songs);
    } catch (error) {
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error adding songs to playlist');
    }
};