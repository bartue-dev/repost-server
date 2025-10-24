import { prisma } from "./helper.js"; 

class PublicData {
  //get public posts
  async getPublicPost() {
    return await prisma.post.findMany({
      include: {
        user:true, 
        reactions: true, 
        likedPost: {
          select: {
            userId: true
          }
        }
      }
    })
  }

  //search posts by tags
  async searchPostByTags(
    tags: string[],
  ) {
    return await prisma.post.findMany({
      where: {
        tags: {hasSome: tags}
      },
      include: {
        user:true, 
        reactions: true, 
        likedPost: {
          select: {
            userId: true
          }
        }
      }
    })
  }
}

export const publicMethods = new PublicData()