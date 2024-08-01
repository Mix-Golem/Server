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
