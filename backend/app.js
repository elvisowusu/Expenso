const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

dotenv.config();
// Connect to MongoDB
mongoose.connect(process.env.mongoDb_connection_string, {})
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    });
    
// initialize database
require('./models/users.model.js');

post('/api/users',(req, res) => {
    const { name, email, password } = req.body;


    res.status(200).json({
        status: 'success',
        message: 'User created successfully',
    })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ status: "failed", message: err.message });
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);