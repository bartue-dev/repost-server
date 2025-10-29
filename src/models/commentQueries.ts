import { includeComment, prisma } from "./helper.js"
import type { Comment as CommentType } from "@prisma/client";

class Comment {
  //create comment
  async createComment(
    comment: string,
    userId: string,
    postId: string
  ) {
    return await prisma.comment.create({
     data: {
      comment: comment,
      postId: postId,
      userId: userId
     }
    });
  }

  //create child comment
  async creatChildComment(
    comment: string,
    id: string,
    userId: string
  ) {
    return await prisma.comment.create({
      data: {
        comment: comment,
        parentCommentId: id, 
        userId: userId,
      }
    })
  }

  //get all comments
  async getAllComments(
    postId: string, 
    levels: number = 3
  ) {
    return await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include:{
        childComment: {
          include: includeComment(levels) 
        } 
      }
    });
  }

  //get all comments with pagination
  async getAllCommentsWithPagination(
    postId: string, 
    skip: number, 
    take: number, 
    levels: number = 3
  ) {
    return await prisma.comment.findMany({
      skip: +skip,
      take: +take,
      orderBy: { createdAt: "asc" },
      where: {
        postId: postId,
      },
      include:{
        childComment: {
          include: includeComment(levels) 
        } 
      }
    });
  }

  async getComment(
    id: string
  ) {
    return await prisma.comment.findUnique({
      where: {id: id}
    })
  }

  //get child comments
  async getChildComments(id: string) {
    return await prisma.comment.findMany({
      where: {
        parentCommentId: id
      }
    });
  }

  //get child comments with pagination
  async getChildCommentsWithPagination(
    id: string, 
    skip: number, 
    take: number
  ) {
    return await prisma.comment.findMany({
      skip: +skip,
      take: +take,
      where: {
        parentCommentId: id
      }
    });
  }

  //update comment
  async updateComment(
    comment: string,
    userId: string, 
    id: string
  ) {
    return await prisma.comment.update({
      where: {
        id: id,
        userId: userId
      },
      data: {
        comment: comment
      }
    });
  }

  //delete comment recursively
  async deleteComment(
    id: string, 
    userId: string
  ) {
    const childComment: CommentType[] = await prisma.comment.findMany({
      where:{
        parentCommentId: id,
        userId: userId
      }
    });

    //recursive delation
    for (const child of childComment) {
      await this.deleteComment(child.id, userId)
    }

    //during recursion delete all the children comment using parentCommentId
    await prisma.comment.deleteMany({
      where: {
        parentCommentId: id,
        userId: userId
      }
    });

    //then delete the parent comment
    return await prisma.comment.delete({
      where: {
        id: id,
        userId: userId
      }
    });
  }
}

export const commentMethods = new Comment();