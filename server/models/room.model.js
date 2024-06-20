const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  desc: {
    type: String,
    required: true,
  },
  roomNumbers: {
    type: [
      {
        number: Number,
        unavailableDates: [Date],
      },
    ],
  },
});

module.exports = mongoose.model("Room", roomSchema);
