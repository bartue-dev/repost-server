import { query, param } from "express-validator";

export const validateSearchPostsByTags = [
  query("tags").optional()
    .isString().withMessage("Search tags must be a string")
]

export const validateGetSpecificPublicPosts = [
  param("postId")
    .exists().withMessage("Post id doesn't exist")
    .isUUID().withMessage("Post id is not a valid UUID")
]