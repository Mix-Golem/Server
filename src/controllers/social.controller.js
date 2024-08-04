import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getRankResponseDTO } from "../dtos/social.dto.js";
import { getSocial } from "../services/social.service.js";

export const rank = async (req, res) => {
  try {
    const { rank } = req.params;
    let result;
    if (rank === "top") {
      result = await getTopRank();
    } else if (rank === "today") {
      result = await getTodayRank();
    } else {
      return res.status(400).send(response(status.BAD_REQUEST, "잘못된 경로입니다."));
    }
    const responseDTO = getRankResponseDTO(rank, result);
    res.send(responseDTO);
  } catch (error) {
    console.error(error);
    res.status(500).send(response(status.BaseError, error.message));
  }
};

const getTopRank = async () => {
  return await getSocial("top");
};

const getTodayRank = async () => {
  return await getSocial("today");
};
