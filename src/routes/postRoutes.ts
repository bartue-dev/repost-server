import { Router } from "express";
import { 
  getAllPost, 
  createPost, 
  getPost, 
  updatePost, 
  deletePost,
} from "../controller/postController.js"
const router = Router();
 
//api route

router.route("/")
  //get all post
  .get(getAllPost)
  //create post
  .post(createPost)
  

router.route("/:id/")
  //get specific post with postId params
  .get(getPost)
  //update specific post with postId params
  .put(updatePost)
  //delete specific post with postId params
  .delete(deletePost);



export default router


