import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createGame,
  getGames,
  getGame,
  attack,
  powerAttack,
  heal,
  surrender,
  getLogs,
} from "../controllers/game.controller.js";

const router = express.Router();

router.post("/game", authMiddleware, createGame);
router.get("/game", authMiddleware, getGames);
router.get("/game/:id", authMiddleware, getGame);
router.post("/game/:id/attack", authMiddleware, attack);
router.post("/game/:id/power-attack", authMiddleware, powerAttack);
router.post("/game/:id/heal", authMiddleware, heal);
router.post("/game/:id/surrender", authMiddleware, surrender);
router.get("/game/:id/logs", authMiddleware, getLogs);

export default router;
