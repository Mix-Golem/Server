export const insertMusicSql= "insert INTO SONG_INFO_TB( USER_ID, TITLE, ABOUT, CREATED_AT, MEDIA, PUBLIC, THUMBNAIL, PROMPT) VALUES (?,?,?,?,?,?,?,?);";

export const insertLyricsSql= "insert into SONG_LYRIC_TB(song_id, lyric, start_time, end_time)values(?,?,?,?);";

export const findGenreSql= "select EXISTS (select * from SONG_GENRE_TB where type=? limit 1) as success;";

export const getGenreSql= "select id from SONG_GENRE_TB where type =? ;";

export const insertMusicGenreSql="insert SONG_GENRE_INFO(genre_id, song_id) values (?,?);";

export const insertGenreSql= "insert SONG_GENRE_TB(type) values (?);";

export const deleteMusicSql = "DELETE FROM SONG_INFO_TB WHERE ID = ?;";

export const insertLikeSQL ="insert INTO SONG_FAVORITE_TB(user_id,song_id,created_at) values (?,?,?);";

export const deleteLikeSQL = "delete from SONG_FAVORITE_TB WHERE  user_id =? and song_id =?;";

export const isLikeSQL = "select EXISTS (select * from SONG_FAVORITE_TB where user_id =? and song_id =? limit 1) as success;"

export const findUserIdfromSongSQL ="select SONG_INFO_TB.user_id from SONG_INFO_TB where id=?;"

export const findNamefromUserId ="select name from USER_MEMBER_TB where id=?;"

export const insertAlarmSQL = "insert into USER_NOTIFICATION_TB(user_id, content, `read`, created_at, notification_type, target_user_id) values (?,?,0,?,?,?);";