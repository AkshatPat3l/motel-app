const { errorHandler } = require("../middleware/errorHandler.js");
const Room = require("../models/room.model.js");

//Create Room
const createRoom = async (req, res, next) => {
  const { name, price, desc } = req.body;
  if (!name || !desc || name === " " || desc === " ") {
    return next(errorHandler(400, "All fields required"));
  }
  const newRoom = await Room.create({ name, price, desc });
  try {
    await newRoom.save();
    res.json({message:"Room Created Successfully"});
  } catch (error) {
    next(error);
  }
};

//Get all Rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    if (!rooms) {
      return next(errorHandler(404, "No Rooms Found"));
    }
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

//Get Single Room
const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return next(errorHandler(404, "Room not found"));
    }

    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//Update Room
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          desc: req.body.desc,
          roomNumbers: req.body.roomNumbers,
        },
      },
      { new: true }
    );
    if (!updatedRoom) {
      return next(errorHandler(404, "Room not found"));
    }
    return res.json("Room Updated Successfully");
  } catch (error) {}
};

//Delete room
const deleteRoom = async (req, res, next) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if(!deletedRoom){
      return next(errorHandler(404, "Room not found"));
    }
    return res.json("Room Deleted Successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
