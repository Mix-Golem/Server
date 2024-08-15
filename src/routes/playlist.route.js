import express from "express";
import { insertPlaylistController, deletePlaylistController, showUserPlaylistsController,playlistInfoController, addSongsToPlaylistController, updatePlaylistNameController} from "../controllers/playlist.controller.js";
export const playlistRoute = express.Router();

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
playlistRoute.get('/user/:userId',async (req, res) =>{
    await showUserPlaylistsController(req, res);
});

// 플레이리스트명 변경
playlistRoute.put('/:id', async (req, res) => {
    await updatePlaylistNameController(req, res);
});