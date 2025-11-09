import { prisma } from "./helper.js";

class Auth {
  async updateUserData(
    id : string, 
    name : string, 
    email : string, 
    image : string
  ) {
    return await prisma.user.update({
      where: { id: id},
      data: {
        name: name,
        email: email,
        image: image
      }
    })
  }
}

export const authMethods = new Auth();