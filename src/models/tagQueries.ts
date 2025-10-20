import { prisma } from "./helper.js";

class Tags {
  //create tags
  async createTags(
    tagName: string[],
    postId: string,
    userId: string
  ) {
    return await prisma.tags.create({
      data: {
        tagName: tagName,
        postId: postId,
        userId: userId
      }
    })
  }

  //update tags
  async updateTags(
    tagName: string[],
    id: string,
    userId: string
  ) {
    return await prisma.tags.update({
      where: {id: id, userId: userId},
      data: { tagName: tagName}
    })
  }

  //delete tags
  async deleteTags(
    id: string,
    userId: string
  ) {
    return await prisma.tags.delete({
      where: {id: id, userId: userId}
    })
  }
}

export const tagsMethods = new Tags();