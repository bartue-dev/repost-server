import { prisma } from "./helper.js"; 

class PublicData {
  //get public posts
  async getPublicPost() {
    return await prisma.post.findMany({
      include: {user:true, reactions: true}
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
      include: {user:true, reactions: true}
    })
  }
}

export const publicMethods = new PublicData()