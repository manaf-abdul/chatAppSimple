const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

const chatRoute = require("./routes/chat");
const messageRoute = require("./routes/messages");
const userRoute = require("./routes/users");

dotenv.config();

PORT=process.env.PORT || 8800

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use(express.json());
app.use(morgan("common"));

//routes
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
  console.log(`Backend server is running! on ${PORT}`);
});
