import {
  getTopRankDao,
  getTodayRankDao,
  followDAO,
  unfollowDAO,
  checkFollowDAO,
  checkUnfollowDAO,
  followingListDAO,
  followerListDAO,
} from "../models/dao/social.dao.js";
import { createRankDTO, getRankResponseDTO } from "../dtos/social.dto.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { createJwt, verify } from "../middleware/jwt.js";

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

export const followService = async (token, req) => {
  const decoded = verify(token).req;
  const followerId = decoded.id;
  const { followingId } = req;
  try {
    const exists = await checkFollowDAO(followerId, followingId);

    if (exists) {
      return false;
    }
    return await followDAO(followerId, followingId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unfollowService = async (token, req) => {
  const decoded = verify(token).req;
  const followerId = decoded.id;
  const { followingId } = req;
  try {
    const exists = await checkUnfollowDAO(followerId, followingId);

    if (!exists) {
      return false;
    }
    return await unfollowDAO(followerId, followingId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const followlistService = async (token) => {
  const decoded = verify(token).req;
  const userId = decoded.id;

  try {
    const followingList = await followingListDAO(userId);
    const followerList = await followerListDAO(userId);

    let responseData = [];

    for (let i = 0; i < followingList.length; i++) {
      responseData.push(followingList[i]);
    }

    for (let i = 0; i < followerList.length; i++) {
      responseData.push(followerList[i]);
    }

    return {
      followingList: followingList,
      followerList: followerList
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};