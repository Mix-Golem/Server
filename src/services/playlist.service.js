// service에서 실제 구현해야 하는 로직 구현
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertPlaylistDAO } from "../models/dao/playlist.dao.js";

// 플레이리스트를 생성하는 함수
export const insertPlaylistService = async (userId, data) => {
    // 플레이리스트 생성 요청 데이터를 DTO를 통해 가공합니다.
    const time = new Date().toISOString();
    const playlistData = {
        id: userId,
        title: data.title,
        createAt: time
    };

    // DAO 함수통해 DB에 위에 playlistData 삽입
    try {
        const insertPlaylistData = await insertPlaylistDAO(playlistData);
        return insertPlaylistData;
    } catch (error) { // 예외처리
        console.error(error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, 'Error creating playlist');
    }
};
