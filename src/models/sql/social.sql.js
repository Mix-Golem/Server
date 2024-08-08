export const todayRankQuery = `
SELECT 
    u.id AS user_id,
    u.name AS userName,
    s.title,
    s.thumbnail
FROM MIXGOLEM.USER_MEMBER_TB u
INNER JOIN MIXGOLEM.SONG_INFO_TB s ON u.id = s.user_id
LEFT JOIN MIXGOLEM.SONG_FAVORITE_TB f ON s.id = f.song_id
WHERE f.created_at >= NOW() - INTERVAL 7 DAY
GROUP BY u.id, u.name, s.title, s.thumbnail
ORDER BY COUNT(f.id) DESC
LIMIT 10;

`;
export const topRankQuery = `
SELECT 
    u.id AS user_id,
    u.name AS userName,
    s.title,
    s.thumbnail
FROM MIXGOLEM.USER_MEMBER_TB u
INNER JOIN MIXGOLEM.SONG_INFO_TB s ON u.id = s.user_id
LEFT JOIN MIXGOLEM.SONG_FAVORITE_TB f ON s.id = f.song_id
WHERE f.created_at >= NOW() - INTERVAL 7 DAY
GROUP BY u.id, u.name, s.title, s.thumbnail
ORDER BY COUNT(f.id) DESC
LIMIT 10;

`;
