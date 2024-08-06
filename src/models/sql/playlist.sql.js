
// 재생목록 만들기 위한 퀘리문
export const insertPlaylistSql = "INSERT INTO SONG_PLAYLIST_TB (USER_ID, TITLE, CREATED_AT) VALUES (?, ?, ?);";

// 재생목록 삭제 쿼리문
export const deletePlaylistSql = "DELETE FROM SONG_PLAYLIST_TB WHERE ID = ?;";

// 재생목록 조회 (id, song_id, playlist_id, order)
export const playlistInfoSql = `
    SELECT sp.id AS playlist_id, sp.title AS playlist_title, si.id AS song_id, si.title AS song_title, spi.order AS song_order
    FROM SONG_PLAYLIST_TB sp
    LEFT JOIN SONG_PLAYLIST_INFO spi ON sp.id = spi.playlist_id
    LEFT JOIN SONG_INFO_TB si ON spi.song_id = si.id
    WHERE sp.id = ?;
`;