# Stackoverflow Lite 
### A platform where people can ask questions and provide answers.
###### . 

## Tools
>+ __Server Side Framework:__ Node/Express
>+ __ORM:__ Sequelize
>+ __Database:__ MySQL
>+ __Version Control:__ Git
>+ __Linting Library:__ Eslint
>+ __Style Guide:__ Airbnb
>+ __Error Handling Library:__ Winston
>+ __Testing Framework:__ Mocha​ and Chai
>+ __Coverage:__ Istanbul NYC

## Links
### API Documentation
https://documenter.getpostman.com/view/25349712/2s8ZDU4ihv

### Hosted API
https://www.render.com/...

### Github Repo
https://github.com/udohPixel/stackoverflow_lite


## API Endpoints (See API Documentation for full API Endpoints with example code implementation)
### Users
``` js
POST    /api/v1/auth/register                   register new user
POST    /api/v1/auth/login                      login user
PUT     /api/v1/users                           update personal user profile
PUT     /api/v1/users/password/update           update personal user password
GET     /api/v1/users                           get all users
GET     /api/v1/users/:username                 get user
PUT     /api/v1/users/:id                       update user
DELETE  /api/v1/users/:id                       delete user
PUT     /api/v1/users/:id/status                update user active status
POST    /api/v1/users/password/forgot           generate password reset token
PUT     /api/v1/users/password/reset/:token     reset password via reset link
```

### Categories
``` js
POST    /api/v1/categories                      add new category
GET     /api/v1/categories                      get all categories
PUT     /api/v1/categories/:id                  update category
DELETE  /api/v1/categories/:id                  delete category
```

### Questions
``` js
POST    /api/v1/questions                       add new question
PUT     /api/v1/questions/:id                   update user question
DELETE  /api/v1/questions/:id                   delete question
PUT     /api/v1/questions/:id/status            update question active status
GET     /api/v1/questions/:id                   get question
GET     /api/v1/questions                       get all questions
GET     /api/v1/questions/?username={username}  get all user questions
```

### Answers
``` js
POST    /api/v1/answers                         add new answer
PUT     /api/v1/answers/:id/accepted            update accepted answer
DELETE  /api/v1/answers/:id                     delete answer
PUT     /api/v1/answers/:id                     update user answer
GET     /api/v1/answers                         get all answers to a question
GET     /api/v1/answers/?username={username}    get all user answers to a question
```

### Votes
``` js
PUT     /api/v1/answers/:id/upvote              upvote an answer
PUT     /api/v1/answers/:id/downvote            downvote an answer
```

### Comments
``` js
POST    /api/v1/comments                        add new comment
PUT     /api/v1/comments/:id                    update user comment
DELETE  /api/v1/comments/:id                    delete comment
GET     /api/v1/comments                        get all comments on an answer
GET     /api/v1/comments/?username={username}   get all user comments on an answer
```