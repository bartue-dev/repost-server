import asyncHandler from "express-async-handler"
import { publicMethods } from "../models/getPublicQueries.js";
import { CustomErr } from "../middleware/customErr.js";


export const getPublicPost = asyncHandler(async (req, res, next) => {

  const posts = await publicMethods.getPublicPost();

  if (!posts) {
    const err = new CustomErr("Error on retrieving post", 400)
    next(err);
    return
  }

  res.status(200).json({
    success: true,
    data: { posts }
  })
})