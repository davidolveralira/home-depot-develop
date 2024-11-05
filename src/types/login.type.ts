export interface LoginType {
  id: string;
  token: string;
  email: string; // Agregar la propiedad email aquí
}

export type LoginForm = {
  email: string;
  password: string;
};

export interface RegisterForm {
  email: string;
  password: string;
  companyName: string;
  firstName: string; // Cambiado a firstName
  lastName: string;
  phone: string;
  companyAddress: string;
  business: string;
}

// Definir la interfaz para los datos de registro
export interface RegisterMyselfPayload {
  email: string;
  password: string;
  phone: string;
  keepSignedIn: boolean;
}
