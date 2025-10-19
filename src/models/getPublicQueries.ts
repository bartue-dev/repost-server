import { prisma } from "./helper.js"; 

class PublicData {
  async getPublicPost() {
    return await prisma.post.findMany({
      include: {user:true, reactions: true}
    })
  }
}

export const publicMethods = new PublicData()