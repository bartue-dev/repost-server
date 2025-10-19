import { prisma } from "./helper.js";
import {Type} from "@prisma/client"

class Reactions {

  //create reactions
  async createReactions(
    type: Type, 
    postId: string, 
    userId: string
  ) {
    return await prisma.reactions.upsert({
      where: {postId_userId: {postId, userId}},
      update: {type: type},
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

  //update reactions
  // async updateReactions(
  //   id: string, 
  //   type: string,
  //   userId: string
  // ) {
  //   return await prisma.reactions.update({
  //     where: { 
  //       id: id, 
  //     },
  //     data: {
  //       type: type
  //     }
  //   })
  // }

  //delete reaction
  async deleteReaction(id: string) {
    return await prisma.reactions.delete({
      where: { id: id }
    })
  }

}

export const reactionsMethods = new Reactions()