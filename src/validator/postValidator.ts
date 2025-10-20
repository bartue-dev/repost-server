import { body, param, query } from "express-validator";

const isEmptyMsg = "must not be empty";

export const validateCreatePost = [
  body("title").trim()
    .notEmpty().withMessage(`Title ${isEmptyMsg}`),
  body("content").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`)
]

export const validateUpdatePost = [
  body("title").trim()
    .notEmpty().withMessage(`Title ${isEmptyMsg}`),
  body("content").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`),
  param("id")
  .exists().withMessage("Post id doesn't exist")
  .isUUID().withMessage("Post id must be a valid UUID")
]

export const validateGetPost = [
  param("id")
    .exists().withMessage("Post id doesn't exist")
    .isUUID().withMessage("Post id is not a valid UUID")
]

export const validateDeletePost = [
  param("id")
    .exists().withMessage("Post id doesn't exist")
    .isUUID().withMessage("Post id is not a valid UUID")
]

export const validateSearchPostsByTags = [
  query("tags")
    .notEmpty().withMessage(`Search tags ${isEmptyMsg}`)
    .isString().withMessage("Search tags must be a string")
]