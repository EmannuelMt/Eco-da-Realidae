// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import authReducer from './slices/authSlice';
import gameReducer from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    character: characterReducer,
    auth: authReducer,
    game: gameReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['game/startSession'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['game.activeSession.startTime']
      }
    })
});