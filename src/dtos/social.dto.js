export const createRankDTO = (id, userId, thumbnail, title, userName) => {
  return {
    id,
    userId,
    thumbnail,
    title,
    userName,
  };
};

export const getRankResponseDTO = (data) => {
  return {
    result: {
      songs: data,
    },
  };
};
