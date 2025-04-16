import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

import registration from "./modules/users/controllers/registration.controller.js";
configDotenv()

// Connect to MongoDB
mongoose.connect(process.env.mongoDb_connection_string, {})
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.log("Database connection failed:", err);
});

const app = express();
app.use(express.json());

app.post('/api/user', registration);

// Health check & 404
app.get('/', (req, res) => res.json({ status: 'success', message: 'Expenso API is running' }));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ status: "failed", message: err.message });
  });


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

export default app;