import { config } from "../config";

const API_BASE_URL = config.API_BASE_URL;

const getAuthToken = (): string | null => {
  return localStorage.getItem(config.AUTH_TOKEN_KEY);
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  signup: async (
    fullName: string,
    email: string,
    password: string,
    avatar?: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password, avatar }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Signup failed");
    }

    return response.json();
  },

  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  },

  verifyToken: async () => {
    const response = await fetch(`${API_BASE_URL}/verify`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Token verification failed");
    }

    return response.json();
  },
};

export const gameApi = {
  createGame: async () => {
    const response = await fetch(`${API_BASE_URL}/game`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create game");
    }

    return response.json();
  },

  getGames: async () => {
    const response = await fetch(`${API_BASE_URL}/game`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    return response.json();
  },

  getGame: async (gameId: string) => {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch game");
    }

    return response.json();
  },

  attack: async (gameId: string) => {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/attack`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Attack failed");
    }

    return response.json();
  },

  powerAttack: async (gameId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/game/${gameId}/power-attack`,
      {
        method: "POST",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Power attack failed");
    }

    return response.json();
  },

  heal: async (gameId: string) => {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/heal`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Heal failed");
    }

    return response.json();
  },

  surrender: async (gameId: string) => {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/surrender`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Surrender failed");
    }

    return response.json();
  },

  getLogs: async (gameId: string) => {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/logs`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }

    return response.json();
  },
};

export const tokenManager = {
  setToken: (token: string) => {
    localStorage.setItem(config.AUTH_TOKEN_KEY, token);
  },

  getToken: () => {
    return localStorage.getItem(config.AUTH_TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(config.AUTH_TOKEN_KEY);
  },
};
