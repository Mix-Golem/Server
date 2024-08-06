import express from "express";
import { insertPlaylistController, deletePlaylistController, playlistInfoController } from "../controllers/playlist.controller.js";
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