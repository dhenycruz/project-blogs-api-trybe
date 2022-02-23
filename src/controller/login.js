const loginModel = require('../service/login');

const authEmail = (req, res, next) => {
  const { email } = req.body;
  const result = loginModel.authEmail(email);
  if (result !== true) return res.status(result.status).json({ message: result.message });
  next();
};

const authPassword = (req, res, next) => {
  const { password } = req.body;
  const result = loginModel.authPassword(password);
  if (result !== true) return res.status(result.status).json({ message: result.message });
  next();
};

const userAlreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const result = await loginModel.userAlreadyExists(email);
  if (result !== true) return res.status(result.status).json({ message: result.message });
  
  next();
};

const executeLogin = async (req, res) => {
  const result = await loginModel.executeLogin(req.body);
  if (result.status === 400) return res.status(result.status).json({ message: result.message });

  res.status(result.status).json({ token: result.token });
};

module.exports = {
  authEmail,
  authPassword,
  userAlreadyExists,
  executeLogin,
};
