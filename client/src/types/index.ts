export interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

export interface GameLog {
  _id: string;
  action: string;
  value?: number;
  commentary: string;
  timestamp: string;
}

export interface Game {
  _id: string;
  player: string;
  health: number;
  covidHealth: number;
  timer: number;
  logs: GameLog[];
  status: "active" | "ended" | "surrendered";
  winner?: string;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    fullName: string,
    email: string,
    password: string,
    avatar?: string
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  initializing: boolean;
  checkAuthStatus: () => void;
}
