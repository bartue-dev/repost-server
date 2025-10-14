import { prisma } from "./helper.js";

class Reactions {

  //create reactions
  async upsertReactions(
    type: string, 
    postId: string, 
    userId: string
  ) {
    return await prisma.reactions.upsert({
      where: { postId: postId },
      update: { type: type },
      create: {
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
    // return await prisma.reactions.groupBy({
    //   by: ["type"],
    //   where: { postId: postId },
    //   _count: { _all: true },
    // })
    return await prisma.reactions.findMany({
      where: { postId: postId }
    })
  }

  //delete reaction
  async deleteReaction(id: string) {
    return await prisma.reactions.delete({
      where: { id: id }
    })
  }

}

export const reactionsMethods = new Reactions()