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