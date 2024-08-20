export const todayRankQuery = `
SELECT 
    u.id AS user_id,
    u.name AS userName,
    s.title,
    s.thumbnail
FROM MIXGOLEM.USER_MEMBER_TB u
INNER JOIN MIXGOLEM.SONG_INFO_TB s ON u.id = s.user_id
LEFT JOIN MIXGOLEM.SONG_FAVORITE_TB f ON s.id = f.song_id
WHERE f.created_at >= NOW() - INTERVAL 1 DAY
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

export const followQuery = `
  INSERT INT?O USER_FOLLOWLIST_TB (follower_id, following_id, created_at)
  SELECT ?, ?, NOW()
  FROM DUAL
  WHERE NOT EXISTS (
    SELECT 1
    FROM USER_FOLLOWLIST_TB
    WHERE follower_id = ? AND following_id = ?
  );
`;
export const unfollowQuery = `
  DELETE FROM USER_FOLLOWLIST_TB
  WHERE follower_id = ?
    AND following_id = ?
    AND following_id IS NOT NULL;
`;
