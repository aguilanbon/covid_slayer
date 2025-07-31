import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

import gameRouter from "./routes/game.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint for Railway
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    message: "COVID Slayer Server is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api", userRouter);
app.use("/api", gameRouter);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});

export default app;
