const express = require("express");
const {
  getRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/room.controller.js");
const router = express.Router();

//get all rooms
router.get("/getRooms", getRooms);

//get single room
router.get("/getRoom/:id", getRoom);

// Create room
router.post("/createRoom", createRoom);

//Update Room
router.put("/updateRoom/:id", updateRoom);

//delete Room
router.delete("/deleteRoom/:id", deleteRoom);

module.exports = router;
