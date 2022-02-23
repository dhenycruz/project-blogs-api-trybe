require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = process.env.JWT_SECRET;

const configJWT = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const authPassword = (password) => {
  if (!password) return ({ status: 400, message: '"password" is required' });

  if (password.length !== 6) {
    return { status: 400, message: '"password" length must be 6 characters long' };
  }

  return true;
};

const authUser = (bodyUser) => {
  if (bodyUser.displayName.length < 8) {
    return { status: 400, message: '"displayName" length must be at least 8 characters long' };
  }

  if (!bodyUser.email) return ({ status: 400, message: '"email" is required' });

  if (!validateEmail(bodyUser.email)) {
    return { status: 400, message: '"email" must be a valid email' };
  }

  return true;
};

const userAlreadyExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return true;

  return { status: 409, message: 'User already registered' };
};

const getAll = async () => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  } catch (e) {
    console.log(e.message);
  }
};

const createUser = async (bodyUser) => {
  try {
    const { displayName, email, password, image } = bodyUser;
    const newUser = await User.create({ displayName, email, password, image });
    const token = jwt.sign({ data: newUser }, secret, configJWT);

    return { status: 201, token };
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getAll,
  authUser,
  authPassword,
  userAlreadyExists,
  createUser,
};