const { StatusCodes } = require("http-status-codes");
const user = require("../models/User");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const register = async (req, res) => {
  const newuser = await user.create(req.body);
  const token = newuser.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: newuser.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide tthe valid credentials");

  const foundUser = await user.findOne({ email });
  if (!foundUser) throw new UnauthenticatedError("Invalid Email");

  const isPasswordmatch = await foundUser.comparePassword(password);
  if (!isPasswordmatch) throw new UnauthenticatedError("Invalid Password");

  const token = foundUser.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: foundUser.name, userId: foundUser._id }, token });
};

module.exports = { register, login };
