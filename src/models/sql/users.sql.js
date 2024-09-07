//=================================
//             Users
//=================================

/**
 * SQL that find user by email
 */
export const findEmailSql = "SELECT email FROM USER_MEMBER_TB WHERE email = ?;";

/**
 * SQL that insert user data
 */
export const saveUserSql =
	"INSERT INTO USER_MEMBER_TB(email, password, name, phonenumber, gender, birth, credit, profile, introduce, social_provider, role, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

/**
 * SQL that find id & password by email
 */
export const findUserSql = "SELECT * FROM USER_MEMBER_TB WHERE email = ?;";

/** SQL that save token to blacklist */
export const expireToken =
	"INSERT INTO USER_TOKEN_EXPIRED_TB(token) VALUES(?);";

/**
 * SQL that update user's profileImage
 */
export const updateProfileById =
	"UPDATE USER_MEMBER_TB SET profile = ? WHERE id = ?";

/**
 * SQL that find password by uid
 */
export const findPasswordById =
	"SELECT password FROM USER_MEMBER_TB WHERE id = ?";

export const updateUserInfoWithoutPasswordSql =
	"UPDATE USER_MEMBER_TB SET name = ?, introduce = ? WHERE id = ?";

export const updateUserInfoWithPasswordSql =
	"UPDATE USER_MEMBER_TB SET name = ?, introduce = ?, password = ? WHERE id = ?";

export const findUserNoticeByIdSql =
	"SELECT * FROM USER_NOTIFICATION_TB WHERE user_id = ?";

export const updateUserNoticeByIdSql =
	"UPDATE USER_NOTIFICATION_TB SET `read` = true WHERE user_id = ?";

export const withdrawByUserIdSql =
	"UPDATE USER_MEMBER_TB SET withdraw_at = ?, withdraw_status = ? WHERE id = ?";

export const deletePlaylistByUserIdSql =
	"DELETE FROM SONG_PLAYLIST_TB WHERE user_id = ?";

export const findMusicIdByUserIdSql =
	"SELECT id FROM SONG_INFO_TB WHERE user_id = ?";

export const deleteMusicByUserIdSql =
	"DELETE FROM SONG_INFO_TB WHERE user_id = ?";

export const deleteMusicLinkBySongIdSql =
	"DELETE FROM SONG_PLAYLIST_INFO WHERE song_id = ?";

export const deleteLyricsBySongIdSql =
	"DELETE FROM SONG_LYRIC_TB WHERE song_id = ?";

export const deleteFollowByUserIdSql =
	"DELETE FROM USER_FOLLOWLIST_TB WHERE follower_id = ?";

export const deleteFollowingByUserIdSql =
	"DELETE FROM USER_FOLLOWLIST_TB WHERE following_id = ?";

export const deleteLikeByUserIdSql =
	"DELETE FROM SONG_FAVORITE_TB WHERE user_id = ?";

export const deleteHistoryByUserIdSql =
	"DELETE FROM USER_HISTORY_TB WHERE user_id = ?";

export const findByIdSql = "SELECT * FROM USER_MEMBER_TB WHERE id = ?";
