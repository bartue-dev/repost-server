import asyncHandler from "express-async-handler";
import { CustomErr } from "../middleware/customErr.js";
import { getAuthContext } from "../lib/auth.js";
import type { RequestHandler } from "express";
import {
  validateCreateReactions,
  validateDeleteReactions,
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

  const reactions = await reactionsMethods.createReactions(type, postId!, user?.id)

  if (!reactions) {
    const err = new CustomErr(`Error on creating reactions ${reactions}`, 400)
    next(err);
    return;
  }

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

  const reactions = await reactionsMethods.getReactionsFromPost(postId!);

  if (!reactions) {
    const err = new CustomErr(`Error on retrieving reactions ${reactions}`, 400)
    next(err);
    return;
  }

  res.status(200).json({
    success: true,
    data: { reactions }
  })

})]

// export const updateReactions: RequestHandler[] = [
//   ...validateCreateReactions,
//   asyncHandler(async (req, res, next) => {
//   const { type } = req.body;
//   const { id } = req.params;
//   const session = await getAuthContext(req.headers);
//   const user = session?.user;

//   if (!user?.id) {
//     const err = new CustomErr("Unauthorized", 401)
//     next(err);
//     return;
//   }

//   //validation
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     res.status(400).json({
//       status: 400,
//       message: "validation error",
//       error: errors.array()
//     });
//     return
//   }

//   const reactions = await reactionsMethods.updateReactions(id!, type, user?.id)

//   if (!reactions) {
//     const err = new CustomErr(`Error on creating reactions ${reactions}`, 400)
//     next(err);
//     return;
//   }

//   res.status(201).json({
//     success: true,
//     data: {
//       reactions
//     }
//   })
// })]

export const deleteReactions: RequestHandler[] = [
  ...validateDeleteReactions
  ,asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
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

  const reactions = await reactionsMethods.deleteReaction(id!)

  if (!reactions) {
    const err = new CustomErr(`Error on delete reactions ${reactions}`, 400)
    next(err);
    return;
  }

  res.sendStatus(204)
})] 