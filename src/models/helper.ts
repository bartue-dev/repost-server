import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type Query = {
  childComment: boolean | {include: Query},
  user: boolean

}

//helper, to hanldle how many child comment include in getAllPost query
export function includeComment(levels: number) {
  let query:Query = { childComment: true, user: true };

  for (let i = 1; i < levels; i++) {
    query = { 
      user: true,
      childComment: {include: query}
    }
  }

  return query
}