import express from "express";
import { insertPlaylistController, deletePlaylistController, showUserPlaylistsController,playlistInfoController, addSongsToPlaylistController, updatePlaylistNameController, updateAndReorderSongsController} from "../controllers/playlist.controller.js";
//import { decodeTokenMiddleware } from "../middleware/auth.middleware.js";
import { verify} from "../middleware/jwt";
export const playlistRoute = express.Router();


// 모든 라우트에 대해 미들웨어 적용(토큰 해석)
//playlistRoute.use(decodeTokenMiddleware);
playlistRoute.use(verify);

// 플레이리스트 생성 라우트
playlistRoute.post('', async (req, res) => {
    const result = await insertPlaylistController(req, res);
});

// 플레이리스트 삭제 라우트
playlistRoute.delete('/:id', async (req, res)=> {
    await deletePlaylistController(req,res);
});

// 플레이리스트 조회 라우트
playlistRoute.get('/:id', async (req, res)=> {
    await playlistInfoController(req,res);
});

// 플레이리스트 곡 추가 route
playlistRoute.post('/add-songs', async (req, res) => {
    await addSongsToPlaylistController(req, res);
});

// 유저의 플레이리스트 전부 보여주기
playlistRoute.get('/user/playlists', async (req, res) => {
    await showUserPlaylistsController(req, res);
});

// 플레이리스트명 변경
playlistRoute.put('/:id', async (req, res) => {
    await updatePlaylistNameController(req, res);
});

// 플레이리스트 곡 순서 변경
playlistRoute.put('/:playlistId/song-order', async (req, res) => {
    await updateAndReorderSongsController(req, res);
});