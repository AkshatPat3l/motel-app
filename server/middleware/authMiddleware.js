const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { errorHandler } = require("./errorHandler.js");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(400).json({ message: "Not Authorized" });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(data.id);

    if (!user) {
      next(errorHandler(400, "Invalid user"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
};
