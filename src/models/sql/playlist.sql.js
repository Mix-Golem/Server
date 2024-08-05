
// 재생목록 만들기 위한 퀘리문
export const insertPlaylistSql = "INSERT INTO PLAYLISTS (USER_ID, TITLE, CREATED_AT) VALUES (?, ?, ?);";