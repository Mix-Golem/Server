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
    followingId: req.followingId,
  };
};

export const unfollowDTO = (req) => {
  return {
    followingId: req.followingId,
  };
};

export const followlistDTO = (req) => {
  return {
    id: req.id,
    profile: req.profile,
    introduce: req.introduce,
  }
}