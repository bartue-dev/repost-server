import asyncHandler from "express-async-handler";
import { CustomErr } from "../middleware/customErr.js";
import { getAuthContext } from "../lib/auth.js";
import type { RequestHandler } from "express";
import {
  validateCreateReactions,
  validateGetReactionFromPost
} from "../validator/reactionsValidator.js"
import { validationResult } from "express-validator";
import { reactionsMethods } from "../models/reactionsQueries.js";

export const createReactions: RequestHandler[] = [
  ...validateCreateReactions,
  asyncHandler(async (req, res, next) => {
  const { type } = req.body;
  const { postId } = req.params;
  const session = await getAuthContext(req.headers);
  const user = session?.user;

  if (!user?.id) {
    const err = new CustomErr("Unauthorized", 401)
    next(err);
    return;
  }

  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      message: "validation error",
      error: errors.array()
    });
    return
  }

  if (!postId) {
    const err = new CustomErr("Post id is undefined", 400)
    next(err);
    return;
  }

  const reactions = await reactionsMethods.createReactions(type, postId, user?.id)

  res.status(201).json({
    success: true,
    data: {
      reactions
    }
  })
})]

export const getReactionsFromPost: RequestHandler[] = [
  ...validateGetReactionFromPost,
  asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      message: "validation error",
      error: errors.array()
    });
    return;
  }

  if (!postId) {
    const err = new CustomErr("Post id is undefined", 400);
    next(err);
    return
  }

  const reactionCount = await reactionsMethods.getReactionsFromPost(postId);

  res.status(200).json({
    success: true,
    data: { reactionCount }
  })

})]