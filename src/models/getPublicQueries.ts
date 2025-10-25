import { prisma, includeComment } from "./helper.js"; 

class PublicData {
  //get public posts
  async getPublicPost(levels = 3) {
    return await prisma.post.findMany({
      include: {
        user:true, 
        reactions: true, 
        comment: {
          include: includeComment(levels)
        },
        likedPost: {
          select: {
            userId: true
          }
        },
      }
    })
  }

  //search posts by tags
  async searchPostByTags(
    tags: string[],
    levels = 3
  ) {
    return await prisma.post.findMany({
      where: {
        tags: {hasSome: tags}
      },
      include: {
        user:true, 
        reactions: true, 
        comment:  {
          include: includeComment(levels)
        },
        likedPost: {
          select: {
            userId: true
          }
        }
      }
    })
  }

  //get specific post
  async getSpecificPublicPost(postId: string, levels = 3) {
    return await prisma.post.findUnique({
      where: {
        id: postId
      },
      include: {
        user: true, 
        reactions: true, 
        comment:  {
          include: includeComment(levels),
        },
        likedPost: {
          select: { userId: true }
        }
      }
    })
  }
}

export const publicMethods = new PublicData()