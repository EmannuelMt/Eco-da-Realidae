import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCharacter: null,
  charactersList: [],
  loading: false,
  error: null
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setCurrentCharacter(state, action) {
      state.currentCharacter = action.payload;
    },
    setCharactersList(state, action) {
      state.charactersList = action.payload;
    },
    updateCharacter(state, action) {
      if (state.currentCharacter && 
          state.currentCharacter.id === action.payload.id) {
        state.currentCharacter = action.payload;
      }
      state.charactersList = state.charactersList.map(char => 
        char.id === action.payload.id ? action.payload : char
      );
    }
  }
});

export const { 
  setLoading, 
  setError, 
  setCurrentCharacter, 
  setCharactersList,
  updateCharacter
} = characterSlice.actions;

export default characterSlice.reducer;