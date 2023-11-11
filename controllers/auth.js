const { StatusCodes } = require("http-status-codes");
const user = require("../models/User");

const register = async (req, res) => {
  const newuser = await user.create(req.body);
  const token = newuser.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: newuser.name }, token });
};

const login = (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
