const express = require("express");
const {
  getRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/room.controller.js");
const { auth } = require("../middleware/authMiddleware.js");

const router = express.Router();

//get all rooms
router.get("/getRooms", getRooms);

//get single room
router.get("/getRoom/:id", getRoom);

// Create room
router.post("/createRoom", auth, createRoom);

//Update Room
router.put("/updateRoom/:id", auth, updateRoom);

//delete Room
router.delete("/deleteRoom/:id", auth, deleteRoom);

module.exports = router;
