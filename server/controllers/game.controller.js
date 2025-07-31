import Game from "../models/Game.js";

const randomValue = () => Math.floor(Math.random() * 10) + 1;

export const createGame = async (req, res) => {
  try {
    const game = await Game.create({ player: req.user.userId });
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ message: "Failed to create game" });
  }
};

export const getGames = async (req, res) => {
  try {
    const games = await Game.find({ player: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch games" });
  }
};

export const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game || String(game.player) !== String(req.user.userId)) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch game" });
  }
};

export const attack = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game || game.status !== "active")
      return res.status(404).json({ message: "Game not found or ended" });
    if (String(game.player) !== String(req.user.userId))
      return res.status(403).json({ message: "Forbidden" });
    const playerDamage = randomValue();
    const covidDamage = randomValue();
    game.covidHealth = Math.max(0, game.covidHealth - playerDamage);
    game.health = Math.max(0, game.health - covidDamage);
    game.logs.push({
      action: "attack",
      value: playerDamage,
      commentary: `Player attacks Covid for ${playerDamage}, gets infected for ${covidDamage}`,
    });
    if (game.covidHealth === 0 || game.health === 0) {
      game.status = "ended";
      game.winner = game.covidHealth === 0 ? "player" : "covid";
    }
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Attack failed" });
  }
};

export const powerAttack = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game || game.status !== "active")
      return res.status(404).json({ message: "Game not found or ended" });
    if (String(game.player) !== String(req.user.userId))
      return res.status(403).json({ message: "Forbidden" });
    const playerDamage = randomValue() + 5;
    const covidDamage = randomValue() + 5;
    game.covidHealth = Math.max(0, game.covidHealth - playerDamage);
    game.health = Math.max(0, game.health - covidDamage);
    game.logs.push({
      action: "power-attack",
      value: playerDamage,
      commentary: `Player power attacks Covid for ${playerDamage}, gets power infected for ${covidDamage}`,
    });
    if (game.covidHealth === 0 || game.health === 0) {
      game.status = "ended";
      game.winner = game.covidHealth === 0 ? "player" : "covid";
    }
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Power attack failed" });
  }
};

export const heal = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game || game.status !== "active")
      return res.status(404).json({ message: "Game not found or ended" });
    if (String(game.player) !== String(req.user.userId))
      return res.status(403).json({ message: "Forbidden" });
    const healValue = randomValue();
    const covidDamage = randomValue();
    game.health = Math.min(100, game.health + healValue - covidDamage);
    game.logs.push({
      action: "heal",
      value: healValue,
      commentary: `Player heals for ${healValue}, gets infected for ${covidDamage}`,
    });
    if (game.health <= 0) {
      game.status = "ended";
      game.winner = "covid";
    }
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Heal failed" });
  }
};

export const surrender = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game || game.status !== "active")
      return res.status(404).json({ message: "Game not found or ended" });
    if (String(game.player) !== String(req.user.userId))
      return res.status(403).json({ message: "Forbidden" });
    game.status = "surrendered";
    game.winner = "covid";
    game.logs.push({ action: "surrender", commentary: "Player surrendered" });
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Surrender failed" });
  }
};

export const getLogs = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game || String(game.player) !== String(req.user.userId))
      return res.status(404).json({ message: "Game not found" });
    const logs = game.logs.slice(-10);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};
