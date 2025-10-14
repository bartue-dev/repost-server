import asyncHandler from "express-async-handler"
import { postMethods } from "../models/postQueries.js";
import { CustomErr } from "../middleware/customErr.js";
import { validationResult } from "express-validator";
import { getAuthContext } from "../lib/auth.js";
import type { RequestHandler } from "express";
import { 
  validateCreatePost, 
  validateGetPost, 
  validateUpdatePost, 
  validateDeletePost 
} from "../validator/postValidator.js"

//create post
export const createPost: RequestHandler[] = [
  ...validateCreatePost,
  asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    const session = await getAuthContext(req.headers);
    const user = session?.user

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

    const post = await postMethods.createPost(title, content, user?.id)

    if (!post) {
      const err = new CustomErr(`Error on creating Post: ${post}`, 400);
      next(err);
      return
    }

    res.status(201).json({
      sucess: true,
      data: {
        post
      }
    });
})];

//get all post with specific user
export const getAllPost: RequestHandler = asyncHandler(async (req, res, next) => {
  const session = await getAuthContext(req.headers);
  const { skip, take } = req.query;
  const user = session?.user
  
  if (!user?.id) {
    const err = new CustomErr(`Unauthorized`, 401);
    next(err)
    return
  }

  let posts;

  if (skip !== undefined && take !== undefined) {
    posts = await postMethods.getAllPostWithPagination(
      user?.id, 
      Number(skip), 
      Number(take)
    ) 
  } else {
    posts = await postMethods.getAllPost(user?.id);
  }

  if (!posts) {
    const err = new CustomErr(`Error on retrieving post: ${posts}`, 400);
    next(err);
    return;
  }

  res.status(200).json({
    sucess: true,
    data: {
      posts
    }
  });
});

//get single post with specific user
export const getPost: RequestHandler[] = [
  ...validateGetPost,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const session = await getAuthContext(req.headers)
    const user = session?.user

    console.log("Post id:", id)

    if (!user?.id) {
      const err = new CustomErr(`Unauthorized`, 401);
      next(err)
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

    const post = await postMethods.getPost(user?.id, id!);

    if (!post) {
      const err = new CustomErr(`Error on retreving a specific post: ${post}`, 404);
      next(err);
      return;
    }

    res.status(200).json({
      sucess: true,
      data: {
        post
      }
    });
  })];

//update post
export const updatePost: RequestHandler[] = [
  ...validateUpdatePost, 
  asyncHandler(async (
    req, 
    res, 
    next
  ) => {
    const { id } = req.params;
    const {title, content} = req.body;
    const session = await getAuthContext(req.headers);
    const user = session?.user
    
    if (!user?.id) {
      const err = new CustomErr(`Unauthorized`, 401);
      next(err)
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

    const updatedPost = await postMethods.updatePost(id!, user?.id, title, content);

    if (!updatedPost) {
      const err = new CustomErr(`Error on updating post: ${updatedPost}`, 400);
      next(err);
      return;
    }

    res.status(200).json({
      sucess: true,
      data: {
        updatedPost
      }
    });
  })];

//delete specifi post
export const deletePost: RequestHandler[] = [
  ...validateDeletePost, 
  asyncHandler(async (
    req, 
    res, 
    next
  ) => {
  const { id } = req.params;
  const session = await getAuthContext(req.headers);
  const user = session?.user;

  if (!user?.id) {
    const err = new CustomErr(`Invalid userId:${id}`, 400);
    next(err)
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

  const deletedPost = await postMethods.deletePost(id!, user?.id);

  if (!deletedPost) {
    const err = new CustomErr(`Error on deleting post: ${deletePost}`, 400);
    next(err);
    return;
  }

  res.sendStatus(204)
})];
