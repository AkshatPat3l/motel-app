const express = require("express");
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
router.get("/getBookings", getBookings);

//get single booking
router.get("/getBooking/:id", getBooking);

//Create booking
router.post("/createBooking", createBooking);

//Update Room
router.put("/updateBooking/:id", updateBooking);

//delete Room
router.delete("/deleteBooking/:id", deleteBooking);
