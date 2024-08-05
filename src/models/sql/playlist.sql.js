
// 재생목록 만들기 위한 퀘리문
export const insertPlaylistSql = "INSERT INTO SONG_PLAYLIST_TB (USER_ID, TITLE, CREATED_AT) VALUES (?, ?, ?);";

// 재생목록 삭제 쿼리문
export const deletePlaylistSql = "DELETE FROM PLAYLISTS WHERE ID = ?;";