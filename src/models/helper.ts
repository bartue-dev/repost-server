import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type Query = {
  childComment: boolean | {include: Query}
}

//helper, to hanldle how many child comment include in getAllPost query
export function includeComment(levels: number) {
  let query:Query = { childComment: true };

  for (let i = 1; i < levels; i++) {
    query = { childComment: {include: query} }
  }

  return query
}