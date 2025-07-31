export const config = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",

  GAME_TIMER_SECONDS: 60,
  ACTION_COOLDOWN_MS: 1000,
  MAX_HEALTH: 100,

  endpoints: {
    auth: {
      login: "/login",
      signup: "/users",
      users: "/users",
    },
    game: {
      create: "/game",
      list: "/game",
      get: (id: string) => `/game/${id}`,
      attack: (id: string) => `/game/${id}/attack`,
      powerAttack: (id: string) => `/game/${id}/power-attack`,
      heal: (id: string) => `/game/${id}/heal`,
      surrender: (id: string) => `/game/${id}/surrender`,
      logs: (id: string) => `/game/${id}/logs`,
    },
  },

  AUTH_TOKEN_KEY: "covid_slayer_auth_token",
};
