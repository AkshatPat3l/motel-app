const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const roomRoutes = require("./routes/room.routes.js");
const bookingRoutes = require("./routes/booking.route.js");
const userRoutes = require("./routes/user.routes.js");
const { errorHandler } = require("./middleware/errorHandler.js");
const { auth } = require("./middleware/authMiddleware.js");
//Get Server Port
const port = process.env.PORT || 5000;
//Set up Server
const app = express();
//Set Up Middlewares
app.use(express.json());
app.use(cookieParser());
//Connect DB
connectDB();
//Routes
app.use("/auth", auth);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
