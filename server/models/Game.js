import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  action: String,
  value: Number,
  commentary: String,
  timestamp: { type: Date, default: Date.now },
});

const gameSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  health: { type: Number, default: 100 },
  covidHealth: { type: Number, default: 100 },
  timer: { type: Number, default: 60 },
  logs: [logSchema],
  status: {
    type: String,
    enum: ["active", "ended", "surrendered"],
    default: "active",
  },
  winner: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model("Game", gameSchema);
export default Game;
