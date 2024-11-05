
// 재생목록 만들기 위한 퀘리문
export const insertPlaylistSql = "INSERT INTO SONG_PLAYLIST_TB (USER_ID, TITLE, CREATED_AT) VALUES (?, ?, ?);";

// 재생목록 삭제 쿼리문
export const deletePlaylistSql = `
    DELETE FROM SONG_PLAYLIST_TB 
    WHERE id = ?;
`;


// 자신의 재생목록 모두 불러오기
export const showUserPlaylistsSql = `
    SELECT 
        sp.id AS playlist_id, 
        sp.title AS playlist_title, 
        sp.created_at,
        (SELECT si.thumbnail FROM SONG_PLAYLIST_INFO spi
         LEFT JOIN SONG_INFO_TB si ON spi.song_id = si.id
         WHERE spi.playlist_id = sp.id
         ORDER BY spi.\`order\`
         LIMIT 1) AS first_song_thumbnail
    FROM SONG_PLAYLIST_TB sp
    WHERE sp.user_id = ?;
`;

// 재생목록 조회 (id, song_id, playlist_id, order)
// export const playlistInfoSql = `
//     SELECT sp.id AS playlist_id, sp.title AS playlist_title, si.id AS song_id, si.title AS song_title, spi.order AS song_order
//     FROM SONG_PLAYLIST_TB sp
//     LEFT JOIN SONG_PLAYLIST_INFO spi ON sp.id = spi.playlist_id
//     LEFT JOIN SONG_INFO_TB si ON spi.song_id = si.id
//     WHERE sp.id = ?;
// `;

// 재생목록 조회 (곡이 배열형태로 나올 수 있게 sql문 수정)
export const playlistInfoSql = `
    SELECT 
        sp.id AS playlist_id, 
        sp.title AS playlist_title, 
        (
            SELECT si.thumbnail
            FROM SONG_INFO_TB si
            JOIN SONG_PLAYLIST_INFO spi ON si.id = spi.song_id
            WHERE spi.playlist_id = sp.id
            ORDER BY spi.order
            LIMIT 1
        ) AS thumbnail,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'song_id', si.id, 
                'song_title', si.title, 
                'song_order', spi.order,  
                'artist_id', um.id,
                'artist_name', um.name,
                'thumbnail', si.thumbnail
            )
        ) AS songs
    FROM SONG_PLAYLIST_TB sp
    LEFT JOIN SONG_PLAYLIST_INFO spi ON sp.id = spi.playlist_id
    LEFT JOIN SONG_INFO_TB si ON spi.song_id = si.id
    LEFT JOIN USER_MEMBER_TB um ON si.user_id = um.id
    WHERE sp.id = ? AND si.id IS NOT NULL
    GROUP BY sp.id;
`;




// 플레이리스트에 곡 추가하는 sql문
export const addSongsToPlaylistSql = `
    INSERT INTO SONG_PLAYLIST_INFO (playlist_id, song_id, \`order\`)
    VALUES (?, ?, ?);
`;

export const getCurrentMaxOrderSql = `
    SELECT IFNULL(MAX(\`order\`), 0) as maxOrder
    FROM SONG_PLAYLIST_INFO
    WHERE playlist_id = ?;
`;

// 플레이리스트명 변경하는 SQL문
export const updatePlaylistNameSql = "UPDATE SONG_PLAYLIST_TB SET TITLE = ? WHERE ID = ?;";


// 플레이리스트에 노래 순서 변경 SQL문
// 노래의 순서를 업데이트하는 SQL문
export const updateSongOrderSql = `
    UPDATE SONG_PLAYLIST_INFO 
    SET \`ORDER\` = ? 
    WHERE PLAYLIST_ID = ? AND SONG_ID = ?;
`;
// 모든 노래의 순서를 1부터 재정렬하는 SQL문
export const reorderSongsSql = `
    UPDATE SONG_PLAYLIST_INFO 
    SET \`ORDER\` = (@rownum := @rownum + 1)
    WHERE PLAYLIST_ID = ?
    ORDER BY \`ORDER\`;
`;

// 플레이리스트 내, 노래 삭제
export const deleteSongFromPlaylistSql = `
    DELETE FROM SONG_PLAYLIST_INFO
    WHERE playlist_id = ? AND song_id = ?;
`;