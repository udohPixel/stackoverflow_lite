# Stakeoverflow Lite 
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

## API Endpoints
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
GET     /api/v1/users/:username/questions       get all user questions
GET     /api/v1/users/:username/answers         get all user answers
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
PUT     /api/v1/questions/:id                   update personal user question
GET     /api/v1/questions                       get all questions
DELETE  /api/v1/questions/:id                   delete question
PUT     /api/v1/questions/:id/status            update question active status
GET     /api/v1/questions/:id                   get question
GET     /api/v1/questions/:questionId/answers   get all answers to a question
```

### Answers
``` js
POST    /api/v1/answers                                     add new answer
```