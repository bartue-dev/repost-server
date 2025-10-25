import asyncHandler from "express-async-handler"
import { publicMethods } from "../models/getPublicQueries.js";
import { CustomErr } from "../middleware/customErr.js";
import { validateGetSpecificPublicPosts, validateSearchPostsByTags } from "../validator/publicDataValidator.js"; 
import type { RequestHandler } from "express";
import { validationResult } from "express-validator";

//get public posts
export const getPublicPost: RequestHandler[] = [
  ...validateSearchPostsByTags
  ,asyncHandler(async (req, res, next) => {
  const { tags } = req.query;

  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      message: "validation error",
      errors: errors.array()
    });
    return
  }

  let tagsArr: string[] = []

  //check first if tags is string then convert it to an array otherwise convert it into string and array
  if (typeof tags === "string") {
    tagsArr = tags.split(" ").map(tag => tag.trim());
  } else if (Array.isArray(tags)) {
    tagsArr = tags.map(String).map(tag => tag.trim());
  }

  let posts;

  //check if query is empty or then retrieve all posts otherwise retrieve posts base by tags query
  if (tagsArr.length <= 0 || tags === "") {
    posts = await publicMethods.getPublicPost();
  } else if (tagsArr.length > 0) {
    posts = await publicMethods.searchPostByTags(tagsArr);
  }

  if (!posts) {
    const err = new CustomErr("Error on retrieving post", 400)
    next(err);
    return
  }

  res.status(200).json({
    success: true,
    data: { posts }
  })
})];

//get public specific posts
export const getSpecificPublicPost: RequestHandler[] = [
  ...validateGetSpecificPublicPosts,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 400,
        message: "validation error",
        errors: errors.array()
      });
      return
    }

    const post = await publicMethods.getSpecificPublicPost(postId!);

    if (!post) {
      const err = new CustomErr("Error on retrieving post", 400)
      next(err);
      return
    }

    res.status(200).json({
      success: true,
      data: { post }
    })
  })];