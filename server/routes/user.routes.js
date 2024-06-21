const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  logOutUser,
} = require("../controllers/user.controller.js");
const { auth } = require("../middleware/authMiddleware.js");

const router = express.Router();

//Get Users
router.get("/getUsers", auth, getUsers);

//Get User
router.get("/getUser/:id", auth, getUser);

//Create User
router.post("/createUser", createUser);

//Login User
router.post("/login", loginUser);

//Logout User
router.get("/logout", logOutUser);

//Update User
router.put("/updateUser/:id", updateUser);

//Delete User
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
