<!-- PROJECT LOGO -->

<a id="readme-top"></a>
<br />

<div align="center">
  <image src="https://github.com/user-attachments/assets/b3dc80ba-8804-4cbd-bc6b-dd31fbb679ba" width="100px"/>
  <h2 align="center">Blog_api</h2>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Blog_api is a personal fullstack project.

Key features:

- User able to create POST with TAGS
- User able to saved POST can be read later
- User can have reactions to other POST
- User able to retrieve all POST or specific POST by user
- User able to search a POST base on TAGS
- The app render public data like POST and COMMENTS

Others:

- Authentication - Uses a better-auth.
- Validation - Uses a express-validator to return a validation errors if client input a invalid api request
- Error response - Created a custom error that handles the error response to every api request
- Prisma error response - Uses the prisma error handling. Handles errors of queries.
- Pagination - Control the data that will be return in response. Uses the offset pagination in prisma queries.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<!-- BADGES -->

- [![Express.js][Express.js-badge]][Express.js-url]
- [![Prisma][Prisma-badge]][Prisma-url]
- [![PostgreSQL][PostgreSQL-badge]][PostgreSQL-url]
- [![TypeScript][typescript-badge]][typescript-url]
- [![Better Auth][betterauth-badge]][betterauth-url]
- [![express-validator][express-validator-badge]][express-validator-url]

<!-- BADGES -->

[Express.js-badge]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express.js-url]: https://expressjs.com/
[Prisma-badge]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[PostgreSQL-badge]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[typescript-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[betterauth-badge]: https://img.shields.io/badge/Better%20Auth-1E293B?style=for-the-badge&logo=auth0&logoColor=white
[betterauth-url]: https://www.npmjs.com/package/better-auth
[express-validator-badge]: https://img.shields.io/badge/express--validator-6A1B9A?style=for-the-badge
[express-validator-url]: https://express-validator.github.io/docs/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] register
- [x] sign-in
- [x] createPost
- [x] getAllPost
  - [x] with offset pagination
- [x] getPost
- [x] updatePost
- [x] deletePost
  - [x] delete all comments that is associated with the post
  - [x] delete the post in likedPost database
- [x] createComment
- [x] createChildComment
- [x] getAllComment
  - [x] with offset pagination
- [x] getChildComment
- [x] updateComment
- [x] deleteComment
  - [x] delete all chid comments that is associated with the comment
- [x] saveLikedPost
- [x] getAllLikedPost
- [x] undoLikedPost
- [x] create and update reactions
- [x] retrieve reactions
- [x] delete reactions
- [x] create or update tags
- [x] delete tags
  - [x] purpose of this tags is to be use for search request
- [x] search post base on tags
  - [ ] with pagination
- [x] public data
  - [x] retrieve public posts
  - [ ] retrieve public comments
  - [ ] retrieve top discussion post(a posts that have the most reactions in order)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
