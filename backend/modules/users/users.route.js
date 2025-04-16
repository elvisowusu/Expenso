import express from "express";
import register from "./controllers/register.controller";

const userRoutes = express.Router();

// user controller
userRoutes.post('/register', register)

export default userRoutes;