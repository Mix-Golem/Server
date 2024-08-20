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

export const followDTO = (req) => {
  return {
    followerId: req.followerId,
    followingId: req.followingId,
  };
};

export const unfollowDTO = (req) => {
  return {
    followerId: req.followerId,
    followingId: req.followingId,
  };
};
