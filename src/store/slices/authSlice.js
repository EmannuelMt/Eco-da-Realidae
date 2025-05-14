// /store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from '../../services/auth';

const initialState = {
  user: null,
  isLoading: true,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;

// Observador de autenticação
export const initAuthListener = () => (dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));
    } else {
      dispatch(logout());
    }
    dispatch(setLoading(false));
  });
};

export default authSlice.reducer;