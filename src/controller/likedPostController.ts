import asyncHandler from "express-async-handler";
import { CustomErr } from "../middleware/customErr.js";
import { validationResult } from "express-validator";
import { likedPostMethods } from "../models/likedpostQueries.js";
import { getAuthContext } from "../lib/auth.js";
import type { RequestHandler } from "express";
import {
  validateDeleteLikedPost,
  validateSaveLikedPost,
  validateUndoLikedPost
} from "../validator/likedPostValidator.js"

export const likedPost: RequestHandler[] = [
  ...validateSaveLikedPost, 
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const session = await getAuthContext(req.headers)
    const user = session?.user;


    if (!user?.id) {
      const err = new CustomErr(`Unauthorized`, 401);
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

    const likedPost = await likedPostMethods.saveLikedPost(postId!, user?.id);

    if (!likedPost) {
      const err = new CustomErr(`Error upon saving liked post: ${likedPost}`, 400);
      next(err);
      return;
    }

    res.status(201).json({
      success: true,
      data: {
        likedPost
      }
    });
})];

export const getAllLikedPost: RequestHandler = asyncHandler(async (req, res, next) => {
  const session = await getAuthContext(req.headers);
  const user = session?.user;

  if (!user?.id) {
    const err = new CustomErr(`Unauthorized`, 401);
    next(err);
    return;
  }

  const allLikedPost = await likedPostMethods.getAllLikedPost(user?.id);

  if (!allLikedPost) {
    const err = new CustomErr(`Error on retrieving liked posts: ${allLikedPost}`, 400);
    next(err);
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      allLikedPost
    }
  });
});

export const undoLikedPost: RequestHandler[] = [
  ...validateUndoLikedPost, 
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const session = await getAuthContext(req.headers);
    const user = session?.user;
    
    if (!user?.id) {
      const err = new CustomErr(`Unauthorized`, 401);
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
      return;
    }

    const undoLikedPost = await likedPostMethods.undoLikedPost(postId!, user?.id);

    if (!undoLikedPost) {
      const err = new CustomErr(`Error on undo liked post: ${undoLikedPost}`, 400)
      next(err);
      return;
    }

    res.sendStatus(204)
})];

export const deleteLikedPost: RequestHandler[] = [
  ...validateDeleteLikedPost, 
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const session = await getAuthContext(req.headers);
    const user = session?.user;
    
    if (!user?.id) {
      const err = new CustomErr(`Unauthorized`, 401);
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
      return;
    }

    const deletedLikedPost = await likedPostMethods.deleteLikedPost(id!, user?.id);

    if (!deletedLikedPost) {
      const err = new CustomErr(`Error on deleting liked post: ${deletedLikedPost}`, 400)
      next(err);
      return;
    }

    res.sendStatus(204)
})];