const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../middleware/errorHandler.js");

//Get Users

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return next(errorHandler(404, "No Bookings Found"));
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
//Get Single User

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      next(errorHandler(400, "User not found"));
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//Create User

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    name === " " ||
    email === " " ||
    password === " "
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();

    res.json("Sign Up Successful!");
  } catch (error) {
    return next(error);
  }
};

//Login User

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are requied"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "Invalid Credentials"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid Credentials"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//Update User

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }
    return res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

//Delete User

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    } else {
      return res.status(200).json(req.params.id);
    }
  } catch (error) {
    next(error);
  }
};

//Log out User
const logOutUser = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out.");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logOutUser,
};
