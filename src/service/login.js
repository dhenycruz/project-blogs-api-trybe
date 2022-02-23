require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = process.env.JWT_SECRET;

const configJWT = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const authEmail = (email) => {
  if (email === '') return { status: 400, message: '"email" is not allowed to be empty' };
  if (!email) return { status: 400, message: '"email" is required' };

  return true;
};

const authPassword = (password) => {
  if (password === '') return { status: 400, message: '"password" is not allowed to be empty' };
  if (!password) return { status: 400, message: '"password" is required' };
  
  return true;
};

const userAlreadyExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { status: 400, message: 'Invalid fields' };

  return true;
};

const executeLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) return { status: 400, message: 'Invalid fields' };
    const token = jwt.sign({ data: user }, secret, configJWT);
    
    return { status: 200, token };
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  authEmail,
  authPassword,
  userAlreadyExists,
  executeLogin,
};
