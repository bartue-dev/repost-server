import { prisma } from "./helper.js";

class LikedPost {
  async saveLikedPost(
    postId: string, 
    userId: string
  ) {
    return await prisma.likedPost.upsert({
      where: {
        postId: postId,
      },
      update: {
        postId: postId
      },
      create: {
        postId: postId,
        userId: userId
      }
    });
  }

  async getlikedPost(postId: string) {
    return await prisma.likedPost.findUnique({
      where: {
        postId,
      }
    });
  }

  async undoLikedPost(id: string, userId: string) {
    return await prisma.likedPost.delete({
      where: {
        id: id,
        userId: userId
      }
    });
  }

  async getAllLikedPost(userId: string) {
    return await prisma.likedPost.findMany({
      where: {
        userId: userId
      },
      include: {
        post:true,
      }
    });
  }
}

export const likedPostMethods = new LikedPost();