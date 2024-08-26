import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { checkFormat } from "../middleware/jwt.js";
import {
  followDTO,
  followlistDTO,
  unfollowDTO,
  rankDTO,
  searchDTO,
} from "../dtos/social.dto.js";
import {
  rankService,
  followService,
  unfollowService,
  followlistService,
  searchService,
} from "../services/social.service.js";

//랭크 컨트롤러
export const rank = async (req, res) => {
  try {
    const { rank } = req.params;
    if (rank === "top" || rank === "today") {
      const result = await rankService(rank, rankDTO(req));
      res.send(response(status.SUCCESS, result));
    } else {
      res.send(response(status.PARAMETER_IS_WRONG, null));
    }
  } catch (error) {
    console.log(error);
    res.send(response(BaseError));
  }
};

//팔로우 컨트롤러
export const follow = async (req, res) => {
  try {
    const token = await checkFormat(req.get("Authorization"));

    if (token !== null) {
      const result = await followService(token, followDTO(req));

      if (result === false) {
        return res.send(response(status.FOLLOW_ERROR, null));
      } else {
        res.send(response(status.SUCCESS, result));
      }
    } else {
      res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
    }
  } catch (error) {
    console.log(error);
    res.send(response(BaseError));
  }
};

//언팔로우 컨트롤러
export const unfollow = async (req, res) => {
  try {
    const token = await checkFormat(req.get("Authorization"));

    if (token !== null) {
      const result = await unfollowService(token, unfollowDTO(req));
      if (result === false) {
        return res.send(response(status.UNFOLLOW_ERROR, null));
      } else {
        res.send(response(status.SUCCESS, result));
      }
    } else {
      res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
    }
  } catch (error) {
    console.log(error);
    res.send(response(BaseError));
  }
};

//팔로우 리스트 컨트롤러
export const followlist = async (req, res) => {
  try {
    const token = await checkFormat(req.get("Authorization"));
    if (token !== null) {
      const list = await followlistService(token, followlistDTO(req));
      res.send(response(status.SUCCESS, list));
    } else {
      res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
    }
  } catch (error) {
    console.log(error);
    res.send(response(BaseError));
  }
};

//검색 기능 컨트롤러
export const search = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    console.log(keyword);
    if (keyword !== null || keyword !== undefined) {
      const result = await searchService(keyword);
      if (result === false) {
        res.send(response(status.VIDEO_NOT_FOUND, null));
      } else {
        res.send(response(status.SUCCESS, result));
      }
    } else {
      throw response(status.PARAMETER_IS_WRONG, null);
    }
  } catch (error) {
    console.log(error);
    res.send(response(BaseError));
  }
};
