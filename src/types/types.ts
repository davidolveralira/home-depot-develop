export type RegisterData = {
  email: string;
  password: string;
};

export type LoginData = {
  id: number;
  email: string;
  password: string;
};

// Definir la estructura del estado auth en un archivo types.ts o similar
export interface AuthState {
  idUser: string;
  token: string;
  email: string;
  isAuthenticated: boolean;
  error: unknown;
  loading: boolean;
}
