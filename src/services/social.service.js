import { getTopRankDao, getTodayRankDao, followDAO, unfollowDAO  } from "../models/dao/social.dao.js";
import { createRankDTO, followDTO, getRankResponseDTO, unfollowDTO } from "../dtos/social.dto.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const getSocial = async (type) => {
  try {
    let data;
    if (type === "top") {
      const songInfo = await getTopRankDao();
      data = songInfo.map((item) =>
        createRankDTO(
          item.user_id,
          item.user_id,
          item.thumbnail,
          item.title,
          item.userName || "Unknown"
        )
      );
    } else if (type === "today") {
      const songInfo = await getTodayRankDao();
      data = songInfo.map((item) =>
        createRankDTO(
          item.user_id,
          item.user_id,
          item.thumbnail,
          item.title,
          item.userName || "Unknown"
        )
      );
    } else {
      throw new BaseError(status.BAD_REQUEST, "Invalid rank type");
    }

    return getRankResponseDTO(data);
  } catch (error) {
    console.error("Service error:", error);
    throw new BaseError(status.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const followService = async (req) => {
  const { followerId, followingId } = followDTO(req);
  try {
    return await followDAO(followerId, followingId); 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unfollowService = async (req) => {
  const { followerId, followingId } = unfollowDTO(req);
  try {
    return await unfollowDAO(followerId, followingId);
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

