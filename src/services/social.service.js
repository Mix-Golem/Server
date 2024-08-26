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
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { verify } from "../middleware/jwt.js";
import { rankDTO } from "../dtos/social.dto.js";

export const rankService = async (type, req) => {
  try {
    let responseData = [];
    if (type === "top") {
      const topRanklist = await getTopRankDao(rankDTO(req));
      for (let i = 0; i < topRanklist.length; i++) {
        responseData.push(topRanklist[i]);
      }
      return { topsongs: topRanklist };
    } else if (type === "today") {
      const todayRanklist = await getTodayRankDao(rankDTO(req));
      for (let i = 0; i < todayRanklist.length; i++) {
        responseData.push(todayRanklist[i]);
      }
      return { todaysongs: todayRanklist };
    } else {
      throw new BaseError(status.BAD_REQUEST, null);
    }
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
      followerList: followerList,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
