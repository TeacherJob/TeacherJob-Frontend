// features/auth/authSlice.js (Full Corrected Code)

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  verificationEmail: string | null;
  tempToken: string | null;
  token: string | null; // This is important for prepareHeaders to read
}

const userFromStorage = localStorage.getItem("user");
const tokenFromStorage = localStorage.getItem("token");

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  isAuthenticated: !!tokenFromStorage,
  token: tokenFromStorage, // Initialize from localStorage
  verificationEmail: null,
  tempToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setVerificationEmail: (state, action: PayloadAction<string>) => {
      state.verificationEmail = action.payload;
    },
    setTempToken: (state, action: PayloadAction<string | null>) => {
      state.tempToken = action.payload;
      // Clear permanent token when setting a temp one
      state.token = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token?: string }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      } else {
        state.token = "cookie_set"; // Use a placeholder for HttpOnly cookies
        localStorage.setItem("token", "cookie_set");
      }

      // Clear temporary data on successful login
      state.verificationEmail = null;
      state.tempToken = null;
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.verificationEmail = null;
      state.tempToken = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logOut, setVerificationEmail, setTempToken } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectVerificationEmail = (state: RootState) =>
  state.auth.verificationEmail;
export const selectTempToken = (state: RootState) => state.auth.tempToken;
