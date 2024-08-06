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
    status: "OK",
    code: 200,
    message: "랭크 호출 성공",
    result: {
      songs: data,
    },
    isSuccess: true,
  };
};
