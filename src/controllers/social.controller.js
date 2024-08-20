import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { followDTO } from "../dtos/social.dto.js";
import { getSocial, followService } from "../services/social.service.js";

export const rank = async (req, res) => {
  try {
    const { rank } = req.params;
    let result;
    if (rank === "top" || rank === "today") {
      result = await getSocial(rank);
    } else {
      return res
    }
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(response(status.INTERNAL_SERVER_ERROR, error.message));
  }
};


export const follow = async (req, res) => {
  try {
    if (await followService(req)) {
      res.send(response(status.SUCCESS, null))
    } else {
      res.send(response(status.BAD_REQUEST,null))
    }
    
  } catch (error) {
    console.log(error);
    res.send(response(BaseError));
  }
}
