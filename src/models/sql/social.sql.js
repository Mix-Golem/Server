export const todayRankQuery = `
SELECT 
    s.id AS songId,
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
    s.id AS songId,
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
  INSERT INTO USER_FOLLOWLIST_TB (follower_id, following_id, created_at)
  SELECT ?, ?, NOW()
`;

export const checkFollowQuery = `
  SELECT COUNT(*) as count
  FROM USER_FOLLOWLIST_TB
  WHERE follower_id = ? AND following_id = ?
`;

export const unfollowQuery = `
  DELETE FROM USER_FOLLOWLIST_TB
  WHERE follower_id = ?
    AND following_id = ?
    AND following_id IS NOT NULL;
`;

export const checkUnfollowQuery = `
    SELECT COUNT(*) AS count
    FROM USER_FOLLOWLIST_TB
    WHERE follower_id = ? AND following_id = ?;
  `;

export const followingListQuery = `
  SELECT 
    f.following_id,
    u2.name AS name,
    u2.profile AS profile,
    u2.introduce AS introduce
  FROM 
    USER_FOLLOWLIST_TB f
  JOIN 
    USER_MEMBER_TB u2 ON f.following_id = u2.id
  WHERE 
    f.follower_id = ?;
`;

export const followerListQuery = `
  SELECT 
    f.following_id,
    u1.name AS name,
    u1.profile AS profile,
    u1.introduce AS introduce
  FROM 
    USER_FOLLOWLIST_TB f
  JOIN 
    USER_MEMBER_TB u1 ON f.follower_id = u1.id
  WHERE 
    f.following_id = ?;
`;

export const searchQuery = `
SELECT DISTINCT
    s.id AS id,
    s.user_id AS userId,
    s.thumbnail AS thumbnail,
    s.title AS title,
    u.name AS userName
FROM
    SONG_INFO_TB s
JOIN
    USER_MEMBER_TB u ON s.user_id = u.id
LEFT JOIN
    SONG_LYRIC_TB l ON s.id = l.song_id
WHERE
        s.title LIKE ?
GROUP BY
    s.id, s.user_id, s.thumbnail, s.title, u.name;
`;

export const getPopularSql = `
SELECT
    um.id AS id,
    um.name AS userName,
    um.profile AS profile,
    COUNT(sf.id) AS total_likes
FROM 
    USER_MEMBER_TB um
JOIN
    SONG_INFO_TB si ON um.id = si.user_id
LEFT JOIN
    SONG_FAVORITE_TB sf ON si.id = sf.song_id
GROUP BY
    um.id, um.name, um.profile
ORDER BY
    total_likes DESC
LIMIT 10;
`;
