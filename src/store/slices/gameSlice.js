// src/store/slices/gameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCampaign: null,
  campaigns: [],
  activeSession: null,
  battleState: {
    grid: [],
    characters: [],
    currentTurn: 0,
    round: 1
  },
  investigationState: {
    clues: [],
    connections: []
  },
  loading: false,
  error: null
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setCurrentCampaign(state, action) {
      state.currentCampaign = action.payload;
    },
    setCampaigns(state, action) {
      state.campaigns = action.payload;
    },
    startSession(state, action) {
      state.activeSession = {
        id: Date.now(),
        startTime: new Date().toISOString(),
        type: action.payload.type,
        participants: action.payload.participants
      };
    },
    endSession(state) {
      state.activeSession = null;
    },
    // Battle actions
    updateBattleGrid(state, action) {
      state.battleState.grid = action.payload.grid;
    },
    addCharacterToBattle(state, action) {
      state.battleState.characters.push(action.payload);
    },
    nextTurn(state) {
      const { characters } = state.battleState;
      state.battleState.currentTurn = 
        (state.battleState.currentTurn + 1) % characters.length;
      if (state.battleState.currentTurn === 0) {
        state.battleState.round += 1;
      }
    },
    // Investigation actions
    addClue(state, action) {
      state.investigationState.clues.push(action.payload);
    },
    addConnection(state, action) {
      state.investigationState.connections.push(action.payload);
    }
  }
});

export const {
  setLoading,
  setError,
  setCurrentCampaign,
  setCampaigns,
  startSession,
  endSession,
  updateBattleGrid,
  addCharacterToBattle,
  nextTurn,
  addClue,
  addConnection
} = gameSlice.actions;

// Thunks para operações assíncronas
export const loadCampaigns = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Aqui você faria a chamada à API
    // const response = await api.get('/campaigns');
    // dispatch(setCampaigns(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default gameSlice.reducer;