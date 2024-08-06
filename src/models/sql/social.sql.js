export const getSongInfoSql = `
  SELECT user_id, title, thumbnail
  FROM SONG_INFO_TB;
`;

export const getUserMemberSql = `
  SELECT id, name
  FROM USER_MEMBER_TB;
`;
