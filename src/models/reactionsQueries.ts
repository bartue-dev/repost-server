import { prisma } from "./helper.js";

class Reactions {

  //create reactions
  async createReactions(
    type: string, 
    postId: string, 
    userId: string
  ) {
    return await prisma.reactions.create({
      data: {
        type: type,
        postId: postId,
        userId: userId
      }
    })
  }

  //get reactions from post
  async getReactionsFromPost(
    postId: string,
  ) {
    return await prisma.reactions.groupBy({
      by: ["type"],
      where: { postId: postId },
      _count: { _all: true }
    })
  }

}

export const reactionsMethods = new Reactions()