import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getSocial } from "../services/social.service.js";

export const rank = async (req, res) => {
  try {
    const { rank } = req.params;
    let result;
    if (rank === "top" || rank === "today") {
      result = await getSocial(rank);
    } else {
      return res
        .status(400)
        .send(response(status.BAD_REQUEST, "잘못된 경로입니다."));
    }
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(response(status.INTERNAL_SERVER_ERROR, error.message));
  }
};
