const { errorHandler } = require("../middleware/errorHandler.js");
const Booking = require("../models/booking.model.js");

//get bookings
const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    if (!bookings) {
      return next(errorHandler(404, "No Bookings Found"));
    }
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

//Get Booking
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(errorHandler(404, "Booking not found"));
    }

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

//Create Bookings

const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);
    if (!booking) {
      return next(errorHandler(400, "All fields required"));
    }

    return res.status(200).json({ message: "Booking created successfully" });
  } catch (error) {
    next(error);
  }
};
//Update Booking
const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedBooking) {
      return next(errorHandler(404, "Booking not found"));
    }
    return res.json("Booking Updated Successfully");
  } catch (error) {
    next(error);
  }
};

//Delete room
const deleteBooking = async (req, res, next) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return next(errorHandler(404, "Booking not found"));
    }
    return res.json("Booking Deleted Successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
};
