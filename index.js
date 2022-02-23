const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./src/controller/user');
const loginController = require('./src/controller/login');
const authToken = require('./src/auth/validateToken');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/user', authToken, userController.getAll);

app.post('/user', 
userController.authUser,
userController.authPassword,
userController.userAlreadyExists,
userController.createUser);

app.post('/login',
loginController.authEmail,
loginController.authPassword,
loginController.userAlreadyExists,
loginController.executeLogin);
