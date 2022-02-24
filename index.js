const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./src/controller/user');
const loginController = require('./src/controller/login');
const authToken = require('./src/auth/validateToken');
const categoryController = require('./src/controller/category');
const postController = require('./src/controller/post');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login',
loginController.authEmail,
loginController.authPassword,
loginController.userAlreadyExists,
loginController.executeLogin);

app.post('/user', 
userController.authUser,
userController.authPassword,
userController.userAlreadyExists,
userController.createUser);

app.get('/user', authToken, userController.getAll);

app.get('/user/:id', authToken, userController.getUser);

app.post('/categories', categoryController.authName, authToken, categoryController.createCategory);

app.get('/categories', authToken, categoryController.getAll);

app.post('/post',
authToken,
postController.authTitle,
postController.authContent,
postController.authCategories,
postController.authCategoriesExists,
postController.createPost);

app.get('/post', authToken, postController.getAll);

app.get('/post/:id', authToken, postController.getPost);

app.put('/post/:id',
authToken,
postController.authTitle,
postController.authContent,
postController.categoriesCannotBeEdited,
postController.authorizationUser,
postController.updatePost);

app.delete('/post/:id',
authToken,
postController.postExist,
postController.authorizationUser,
postController.deletePost);

app.delete('/user/me', authToken, userController.deleteUser);
