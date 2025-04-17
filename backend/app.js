const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./modules/users/users.route");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.mongoDb_connection_string, {})
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });

// Routes
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) =>
  res.json({ status: "success", message: "Expenso API is running" })
);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ status: "failed", message: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
