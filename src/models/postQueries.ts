import { commentMethods } from "./commentQueries.js";
import { prisma, includeComment } from "./helper.js";

//post queries
class Post {

  //create post
  async createPost(
    title: string, 
    content: string, 
    tags: string[],
    userId: string
  ) {
    return await prisma.post.create({
      data: {
        title: title,
        content: content,
        tags: tags,
        userId: userId
      }
    });
  }

  //get all post with specific user
  async getAllPost(
    userId: string, 
    levels: number = 3
  ) {
    return await prisma.post.findMany({
      where: {
          userId: userId
        },
        include: {
          comment: {
            include: includeComment(levels)
          }
        }
    });
  }

  //get all post with pagination with specific user
  async getAllPostWithPagination(
    userId: string, 
    skip: number, 
    take: number, 
    levels: number = 3
  ) {
    return await prisma.post.findMany({
      skip: +skip,
      take: +take,
      where: {
          userId: userId
        },
        include: {
          comment: {
            include: includeComment(levels)
          }
        }
    });
  }

  //get specific post by user
  async getPost(
      userId: string, 
      id: string,
      levels: number = 3
    ) {
    return await prisma.post.findFirst({
      where: {
        id: id,
        userId: userId
      },
      include: {
        comment: {
          include: includeComment(levels)
        }
      }
    });
  }

  //update post
  async updatePost(
    id: string, 
    userId: string, 
    title: string, 
    content: string,
    tags: string[]
  ) {
    return await prisma.post.update({
      where: {
        id: id,
        userId: userId
      },
      data: {
        title: title,
        content: content,
        tags: tags
      }
    });
  }

  //delete post
  async deletePost(id: string, userId: string) {

    //get all comments by postId and authorId
    const comments = await prisma.comment.findMany({
      where: {
        id: id,
        userId: userId
      }
    });

    //call the recursion deleteComment from commentMethods
    //to delete the child comment then parent comment first before deleting the post
    for (const comment of comments) {
      await commentMethods.deleteComment(comment.id, userId)
    }

    //delete post
    return await prisma.post.delete({
      where: {
        id: id,
        userId: userId
      }
    });
  }  
}

export const postMethods = new Post();

