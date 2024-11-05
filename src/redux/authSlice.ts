import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginForm,
  LoginType,
  RegisterForm,
  RegisterMyselfPayload,
} from "../types/login.type";
import axiosInstance from "../config/axios";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";

// Thunk para iniciar sesión
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: LoginForm, thunkAPI) => {
    try {
      const response = await axiosInstance.post<
        null,
        AxiosResponse<LoginType> | AxiosError
      >("/api/login", {
        email,
        password,
      });
      if (isAxiosError(response)) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

// Thunk para registrar usuario
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      email,
      password,
      companyName,
      firstName,
      lastName,
      phone,
      companyAddress,
      business,
    }: RegisterForm,
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post<
        null,
        AxiosResponse<LoginType> | AxiosError
      >("/api/register", {
        email,
        password,
        companyName,
        firstName,
        lastName,
        phone,
        companyAddress,
        business,
      });
      if (isAxiosError(response)) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

// Thunk para registrar usuario
export const registerMyself = createAsyncThunk(
  "auth/registerMyself",
  async (
    { email, password, phone, keepSignedIn }: RegisterMyselfPayload,
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post<LoginType>("/api/register", {
        email,
        password,
        phone,
        keepSignedIn,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || error.message
        );
      }
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

// Crear el slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState: {
    idUser: "",
    token: "",
    email: "", // Agregar el campo email
    isAuthenticated: false,
    error: null as unknown,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.idUser = "";
      state.token = "";
      state.email = ""; // Limpiar el email al hacer logout
      state.isAuthenticated = false;
    },
    setEmail: (state, action) => {
      state.email = action.payload; // Actualiza el email en el estado
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.idUser = action.payload?.id || "";
        state.token = action.payload?.token || "";
        state.email = action.payload?.email || ""; // Almacenar el email
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.idUser = "";
        state.token = "";
        state.email = ""; // Limpiar el email en caso de error
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.idUser = action.payload?.id || "";
        state.token = action.payload?.token || "";
        state.email = action.payload?.email || ""; // Almacenar el email en registro
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.idUser = "";
        state.token = "";
        state.email = ""; // Limpiar el email en caso de error
      });
  },
});

export const { logout, setEmail } = authSlice.actions; // Exportar setEmail
export default authSlice.reducer;
