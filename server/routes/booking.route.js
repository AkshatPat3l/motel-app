const express = require("express");
const { auth } = require("../middleware/authMiddleware.js");
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
} = require("../controllers/booking.controller");
const router = express.Router();

module.exports = router;

//get bookings
router.get("/getBookings", auth, getBookings);

//get single booking
router.get("/getBooking/:id", auth, getBooking);

//Create booking
router.post("/createBooking", createBooking);

//Update Room
router.put("/updateBooking/:id", auth, updateBooking);

//delete Room
router.delete("/deleteBooking/:id", auth, deleteBooking);
