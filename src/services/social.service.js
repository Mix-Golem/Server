import { getUserMemberDao, getSongInfoDao } from "../models/dao/social.dao.js";
import { createRankDTO, getRankResponseDTO } from "../dtos/social.dto.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const getSocial = async (type) => {
  try {
    let data;
    if (type === "top" || type === "today") {
      const songInfo = await getSongInfoDao();
      const userMembers = await getUserMemberDao();

       data= songInfo.map((item) =>
        createRankDTO(
          item.user_id,
          item.user_id,
          item.thumbnail,
          item.title,
          userMembers.find((member) => member.id === item.user_id)?.name ||
            "Unknown"
        )
      );
    } else {
      throw new BaseError(status.BAD_REQUEST);
    }

    return getRankResponseDTO(data);
  } catch (error) {
    console.error("Service error:", error);
    throw new BaseError(status.INTERNAL_SERVER_ERROR);
  }
};
