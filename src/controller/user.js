const modelUser = require('../service/user');

const authUser = async (req, res, next) => {
  const result = await modelUser.authUser(req.body);
  console.log(req.body);
  if (result !== true) return res.status(result.status).json({ message: result.message });

  next();
};

const authPassword = async (req, res, next) => {
  const { password } = req.body; 
  const result = await modelUser.authPassword(password);

  if (result !== true) return res.status(result.status).json({ message: result.message }); 
  
  next();
};

const userAlreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const result = await modelUser.userAlreadyExists(email);

  if (result !== true) return res.status(result.status).json({ message: result.message });
  
  next();
};

const createUser = async (req, res) => {
  const user = await modelUser.createUser(req.body);
  res.status(user.status).json({ token: user.token });
};

const getAll = async (_req, res) => {
  const users = await modelUser.getAll();
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await modelUser.getUser(id);
  if (user.status === 404) return res.status(user.status).json({ message: user.message });
  res.status(user.status).json(user.user);
};

module.exports = {
  getAll,
  authUser,
  authPassword,
  userAlreadyExists,
  createUser,
  getUser,
};
