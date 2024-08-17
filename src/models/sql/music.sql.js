export const insertMusicSql= "insert INTO SONG_INFO_TB( USER_ID, TITLE, ABOUT, CREATED_AT, MEDIA, PUBLIC, THUMBNAIL, PROMPT) VALUES (?,?,?,?,?,?,?,?);";

export const insertLyricsSql= "insert into SONG_LYRIC_TB(song_id, lyric, start_time, end_time)values(?,?,?,?);";

export const findGenreSql= "select EXISTS (select * from SONG_GENRE_TB where type=? limit 1) as success;";

export const getGenreSql= "select id from SONG_GENRE_TB where type =? ;";

export const insertMusicGenreSql="insert SONG_GENRE_INFO(genre_id, song_id) values (?,?);";

export const insertGenreSql= "insert SONG_GENRE_TB(type) values (?);";

export const musicInfoSql = "SELECT si.id AS song_id,si.user_id AS user_id,si.title AS title,si.about AS description,si.created_at AS created_at,si.media AS media_url,si.public AS is_public,si.thumbnail AS thumbnail_url,si.prompt AS prompt_description FROM SONG_INFO_TB si WHERE si.id = ?;"

// export const deleteMusicSql = "DELETE FROM SONG_INFO_TB WHERE ID = ?;";