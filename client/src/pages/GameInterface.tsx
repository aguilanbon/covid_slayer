import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { gameApi } from "../services/api";
import type { Game, GameLog } from "../types";

const GameInterface = () => {
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [gameHistory, setGameHistory] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [gameTimer, setGameTimer] = useState(60);
  const [actionCooldown, setActionCooldown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadGameHistory();
  }, []);

  useEffect(() => {
    const handleGameTimeout = async () => {
      if (!currentGame) return;

      try {
        const updatedGame = await gameApi.getGame(currentGame._id);
        if (updatedGame.health > updatedGame.covidHealth) {
          console.log("Player wins by timeout!");
        } else if (updatedGame.covidHealth > updatedGame.health) {
          console.log("COVID wins by timeout!");
        } else {
          console.log("Game ended in a draw!");
        }
        setCurrentGame({ ...updatedGame, status: "ended" });
      } catch (error) {
        console.error("Failed to handle game timeout:", error);
      }
    };

    if (currentGame && currentGame.status === "active" && gameTimer > 0) {
      const timer = setInterval(() => {
        setGameTimer((prev) => {
          if (prev <= 1) {
            handleGameTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentGame, gameTimer]);

  const loadGameHistory = async () => {
    try {
      const games = await gameApi.getGames();
      setGameHistory(games);
    } catch (error) {
      console.error("Failed to load game history:", error);
    }
  };

  const startNewGame = async () => {
    setLoading(true);
    try {
      const newGame = await gameApi.createGame();
      setCurrentGame(newGame);
      setGameTimer(60);
      await loadGameHistory();
    } catch (error) {
      console.error("Failed to create game:", error);
      alert("Failed to start new game. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const performAction = async (
    actionType: "attack" | "power-attack" | "heal"
  ) => {
    if (!currentGame || currentGame.status !== "active" || actionCooldown)
      return;

    setActionCooldown(true);
    setLoading(true);

    try {
      let updatedGame;

      switch (actionType) {
        case "attack":
          updatedGame = await gameApi.attack(currentGame._id);
          break;
        case "power-attack":
          updatedGame = await gameApi.powerAttack(currentGame._id);
          break;
        case "heal":
          updatedGame = await gameApi.heal(currentGame._id);
          break;
      }

      setCurrentGame(updatedGame);

      if (updatedGame.status === "ended") {
        setGameTimer(0);
        await loadGameHistory();
      }
    } catch (error) {
      console.error(`Failed to perform ${actionType}:`, error);
      alert(`Failed to perform ${actionType}. Please try again.`);
    } finally {
      setLoading(false);
      setTimeout(() => setActionCooldown(false), 1000);
    }
  };

  const handleSurrender = async () => {
    if (!currentGame || currentGame.status !== "active") return;

    const confirmSurrender = window.confirm(
      "Are you sure you want to surrender?"
    );
    if (!confirmSurrender) return;

    setLoading(true);
    try {
      const updatedGame = await gameApi.surrender(currentGame._id);
      setCurrentGame(updatedGame);
      setGameTimer(0);
      await loadGameHistory();
    } catch (error) {
      console.error("Failed to surrender:", error);
      alert("Failed to surrender. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getGameResult = (game: Game) => {
    if (game.status === "surrendered") return "Surrendered";
    if (game.winner === "player") return "Victory";
    if (game.winner === "covid") return "Defeat";
    return "In Progress";
  };

  const getHealthBarColor = (health: number) => {
    if (health > 70) return "bg-green-500";
    if (health > 40) return "bg-yellow-500";
    if (health > 20) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-red-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">COVID Slayer</h1>
            {user && (
              <p className="text-sm text-red-200">Welcome, {user.fullName}!</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {!currentGame || currentGame.status !== "active" ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-red-400">
                  COVID Slayer Arena
                </h2>
                <p className="text-lg mb-6 text-gray-300"></p>

                {currentGame && currentGame.status === "ended" && (
                  <div className="mb-6 p-4 bg-gray-700 rounded">
                    <h3 className="text-xl font-bold mb-2">Game Over!</h3>
                    <p className="text-lg">
                      {currentGame.winner === "player"
                        ? "🎉 Congratulations! You defeated COVID!"
                        : "💀 COVID has defeated you. Try again!"}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Final Score - You: {currentGame.health} | COVID:{" "}
                      {currentGame.covidHealth}
                    </p>
                  </div>
                )}

                <button
                  onClick={startNewGame}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-8 py-3 rounded-lg text-lg font-semibold"
                >
                  {loading ? "Starting..." : "Start New Game"}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">
                        Your Health
                      </h3>
                      <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                        <div
                          className={`h-4 rounded-full transition-all duration-300 ${getHealthBarColor(
                            currentGame.health
                          )}`}
                          style={{
                            width: `${Math.max(0, currentGame.health)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-2xl font-bold">
                        {currentGame.health}/100
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                        Time Left
                      </h3>
                      <p className="text-3xl font-bold text-yellow-400">
                        {formatTime(gameTimer)}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-red-400 mb-2">
                        COVID Health
                      </h3>
                      <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                        <div
                          className={`h-4 rounded-full transition-all duration-300 ${getHealthBarColor(
                            currentGame.covidHealth
                          )}`}
                          style={{
                            width: `${Math.max(0, currentGame.covidHealth)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-2xl font-bold">
                        {currentGame.covidHealth}/100
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🛡️</div>
                      <p className="text-lg font-semibold text-blue-400">
                        Player
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="text-4xl text-yellow-400">⚔️</div>
                    </div>

                    <div className="text-center">
                      <div className="text-6xl mb-2">🦠</div>
                      <p className="text-lg font-semibold text-red-400">
                        COVID-19
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      onClick={() => performAction("attack")}
                      disabled={loading || actionCooldown}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 p-3 rounded-lg text-sm font-semibold"
                    >
                      ⚔️ Attack
                    </button>

                    <button
                      onClick={() => performAction("power-attack")}
                      disabled={loading || actionCooldown}
                      className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 p-3 rounded-lg text-sm font-semibold"
                    >
                      💥 Power Attack
                    </button>

                    <button
                      onClick={() => performAction("heal")}
                      disabled={loading || actionCooldown}
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50 p-3 rounded-lg text-sm font-semibold"
                    >
                      🧪 Heal
                    </button>

                    <button
                      onClick={handleSurrender}
                      disabled={loading}
                      className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 p-3 rounded-lg text-sm font-semibold"
                    >
                      🏳️ Surrender
                    </button>
                  </div>

                  {actionCooldown && (
                    <p className="text-center text-yellow-400 mt-4">
                      Cooldown active...
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-400 mb-4">
                Live Commentary
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {currentGame && currentGame.logs.length > 0 ? (
                  currentGame.logs
                    .slice(-10)
                    .reverse()
                    .map((log: GameLog, index: number) => (
                      <div
                        key={index}
                        className="text-sm p-2 bg-gray-700 rounded"
                      >
                        <p className="text-gray-300">{log.commentary}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No actions yet. Start a game to see live commentary!
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-400 mb-4">
                Game History
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {gameHistory.length > 0 ? (
                  gameHistory.map((game) => (
                    <div
                      key={game._id}
                      className="text-sm p-2 bg-gray-700 rounded"
                    >
                      <div className="flex justify-between items-center">
                        <span
                          className={
                            getGameResult(game) === "Victory"
                              ? "text-green-400"
                              : getGameResult(game) === "Defeat"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }
                        >
                          {getGameResult(game)}
                        </span>
                        <span className="text-gray-500">
                          {new Date(game.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        You: {game.health} | COVID: {game.covidHealth}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No games played yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInterface;
