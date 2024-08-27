export const insertMusicSql= "insert INTO SONG_INFO_TB( USER_ID, TITLE, ABOUT, CREATED_AT, MEDIA, PUBLIC, THUMBNAIL, PROMPT) VALUES (?,?,?,?,?,?,?,?);";

export const insertLyricsSql= "insert into SONG_LYRIC_TB(song_id, lyric, start_time, end_time)values(?,?,?,?);";

export const findGenreSql= "select EXISTS (select * from SONG_GENRE_TB where type=? limit 1) as success;";

export const getGenreSql= "select id from SONG_GENRE_TB where type =? ;";

export const insertMusicGenreSql="insert SONG_GENRE_INFO(genre_id, song_id) values (?,?);";

export const insertGenreSql= "insert SONG_GENRE_TB(type) values (?);";


// export const deleteMusicSql = "DELETE FROM SONG_INFO_TB WHERE ID = ?;";

export const findmusicInfoSql ="select SI.id as id ,SI.user_id as userId, UM.name,SI.title,SI.about,SI.prompt,SI.media,SI.public,SI.thumbnail  from SONG_INFO_TB SI join USER_MEMBER_TB UM on SI.user_id = UM.id where SI.id=?;";

export const findLyricsSQL = "select * from SONG_LYRIC_TB where song_id=?;"

export const countFavoriteSQL ="SELECT song_id, COUNT(*) AS song_count FROM SONG_FAVORITE_TB GROUP BY song_id having song_id=?;"

export const updateSongInfoSQL = "UPDATE SONG_INFO_TB SET title = ?, public = ? WHERE id = ?";

export const findmusicHistorySql = "SELECT uh.id AS id,um.id AS userId,um.name AS userName,si.title AS title,si.thumbnail AS thumbnail FROM USER_HISTORY_TB uh JOIN USER_MEMBER_TB um ON uh.user_id = um.id JOIN SONG_INFO_TB si ON uh.song_id = si.id WHERE uh.user_id = ? ORDER BY uh.created_at DESC;";

export const findmySongSql = "SELECT id FROM SONG_INFO_TB where user_id=?;"

export const deleteMusicSql = "DELETE FROM SONG_INFO_TB WHERE id =? and user_id =?;";

export const insertLikeSQL ="insert INTO SONG_FAVORITE_TB(user_id,song_id,created_at) values (?,?,?);";

export const deleteLikeSQL = "delete from SONG_FAVORITE_TB WHERE  user_id =? and song_id =?;";

export const isLikeSQL = "select EXISTS (select * from SONG_FAVORITE_TB where user_id =? and song_id =? limit 1) as success;"

export const findUserIdfromSongSQL ="select SONG_INFO_TB.user_id from SONG_INFO_TB where id=?;"

export const findNamefromUserId ="select name from USER_MEMBER_TB where id=?;"

export const insertAlarmSQL = "insert into USER_NOTIFICATION_TB(user_id, content, `read`, created_at, notification_type, target_user_id) values (?,?,0,?,?,?);";

export const deleteLyricSql = "DELETE FROM SONG_LYRIC_TB WHERE song_id=?;"

export const deleteLikeSql = "DELETE FROM SONG_FAVORITE_TB WHERE song_id =?;"

export const deletePlaylistSql = "DELETE FROM SONG_PLAYLIST_INFO WHERE song_id =?;"

export const deleteGenreSql ="delete from SONG_GENRE_INFO where song_id=?;";