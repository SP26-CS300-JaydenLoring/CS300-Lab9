const bcrypt          = require('bcrypt');
const { User }        = require('../models/index');
const { generateToken } = require('../utils/jwtUtils');

async function register(email, password) {
  const hash = await bcrypt.hash(password, 10);
  return await User.create({ email, password: hash });
}

async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return generateToken({ id: user.id, email: user.email });
}

module.exports = { register, login };