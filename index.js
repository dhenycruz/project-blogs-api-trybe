const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./src/controller/user');
const loginController = require('./src/controller/login');
const authToken = require('./src/auth/validateToken');
const categoryController = require('./src/controller/category');

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
