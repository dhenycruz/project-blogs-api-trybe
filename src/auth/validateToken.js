require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  
  try {
    const decodec = jwt.verify(token, secret);

    const user = await User.findOne({ where: { email: decodec.data.email } });

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
