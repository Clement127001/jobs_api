const { StatusCodes } = require("http-status-codes");
const user = require("../models/User");

const register = async (req, res) => {
  const newuser = await user.create(req.body);
  res.status(StatusCodes.CREATED).json({ user: newuser });
};

const login = (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
