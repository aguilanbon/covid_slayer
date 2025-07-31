import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

import gameRouter from "./routes/game.routes.js";

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", gameRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'COVID Slayer API is running!' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to COVID Slayer API!' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

export default app;
