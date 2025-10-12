import asyncHandler from "express-async-handler";
import { CustomErr } from "../middleware/customErr.js";
import { commentMethods } from "../models/commentQueries.js";
import { validationResult } from "express-validator";
import { getAuthContext } from "../lib/auth.js";
import type { RequestHandler } from "express";
import { 
  validateCreateChildComment,
  validateCreateComment,
  validateDeleteComment,
  validateGetAllComments,
  validateGetChildComments,
  validateUpdateComment
 } from "../validator/commentValidator.js"

//create comment
export const createComment: RequestHandler[] = [
  ...validateCreateComment,
  asyncHandler(async (req, res, next) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const session = await getAuthContext(req.headers);
    const user = session?.user;

    if (!user?.id) {
      const err = new CustomErr("Unauthorized", 401);
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
      const err = new CustomErr("Post id is undefined", 400);
      next(err);
      return
    }

    const createdComment = await commentMethods.createComment(comment, user?.id, postId);

    //check if createdComment return a value if not...
    if (!createdComment) {
      const err = new CustomErr(`Error on creating a comment: ${createdComment}`, 400)
      next(err)
      return
    }

    res.status(201).json({
      success: true,
      data: {
        createdComment
      }
    });
  })];

//create child comment
export const createChildComment: RequestHandler[] = [
  ...validateCreateChildComment,
  asyncHandler(async (req, res, next) => {
    const { comment } = req.body;
    const { id, postId } = req.params;
    const session = await getAuthContext(req.headers);
    const user = session?.user;

    if (!user?.id) {
      const err = new CustomErr("Unauthorized", 401);
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

    if (!id || !postId) {
      const err = new CustomErr("Comment id is undefined", 400);
      next(err);
      return
    }

    const childComment = await commentMethods.creatChildComment(
      comment, 
      id,
      user?.id, 
    );

    if (!childComment) {
      const err = new CustomErr(`Error on creating a child comment: ${childComment}`, 400);
      next(err);
      return
    }

    res.status(201).json({
      success: true,
      data: {
        childComment
      }
    })
  })];

//getAllComment
export const getComments: RequestHandler[] = [
  ...validateGetAllComments,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params
    const { skip, take } = req.query;
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
      return
    }

    if (!postId) {
      const err = new CustomErr("Post id is undefined", 400);
      next(err);
      return;
    }

    let comments;
    if (skip !== undefined && take !== undefined) {
      comments = await commentMethods.getAllCommentsWithPagination(postId, Number(skip), Number(take));
    } else {
      comments = await commentMethods.getAllComments(postId);
    }


    if (!comments) {
      const err = new CustomErr(`Error on retrieving comments: ${comments}`, 400);
      next(err);
      return
    }

    res.status(200).json({
      success: true,
      data: {
        comments
      }
    })
  })];

//get all child comments
export const getChildComments: RequestHandler[] = [
 ...validateGetChildComments, 
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { skip, take } = req.query
    const session = await getAuthContext(req.headers);
    const user = session?.user;
    
    if (!user?.id) {
      const err = new CustomErr(`Unauthorized`, 401);
      next(err);
      return;
    }

    if (!id) {
      const err = new CustomErr("Comment id is undefined", 400)
      next(err);
      return;
    }

    let childComments;
    if (skip !== undefined && take !== undefined) {
      childComments = await commentMethods.getChildCommentsWithPagination(id, Number(skip), Number(take));
    } else {
      childComments = await commentMethods.getChildComments(id);
    }


    if (!childComments) {
      const err = new CustomErr(`Error on retrieving child comments: ${childComments}`, 404);
      next(err);
      return
    }

    res.status(200).json({
      success: true,
      data: {
        childComments
      }
    });
  })];

//update comment
export const updateComment: RequestHandler[] = [
  ...validateUpdateComment, 
  asyncHandler(async (req, res, next) => {
    const { comment } = req.body;
    const { id } = req.params;
    const session = await getAuthContext(req.headers);
    const user = session?.user;

    if (!user?.id) {
      const err = new CustomErr(`Unauthorized`, 401);
      next(err);
      return
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

    if (!id) {
      const err = new CustomErr("Comment id is undefined", 400)
      next(err);
      return
    }

    const updatedComment = await commentMethods.updateComment(comment, user?.id, id);

    if (!updatedComment) {
      const err = new CustomErr(`Error on updating a comment: ${updatedComment}`, 400)
      next(err);
      return
    }

    res.status(200).json({
      success: true,
      data: {
        updatedComment
      }
    });
  })];

//delete comment
export const deleteComment: RequestHandler[] = [
  ...validateDeleteComment, 
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
      return
    }

    if (!id) {
      const err = new CustomErr("Comment id is undefined", 400)
      next(err);
      return;
    }

    const deletedComment = await commentMethods.deleteComment(id, user?.id);

    if (!deletedComment) {
      const err = new CustomErr(`Error on deleting a comment: ${deletedComment}`, 400);
      next(err);
      return;
    }

    res.sendStatus(204)
  })];