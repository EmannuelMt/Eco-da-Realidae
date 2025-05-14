import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createCharacter = async (characterData) => {
  try {
    const response = await axios.post(`${API_URL}/characters`, characterData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating character:', error);
    throw error;
  }
};

export const getBestiary = async () => {
  try {
    const response = await axios.get(`${API_URL}/bestiary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bestiary:', error);
    throw error;
  }
};

export const generateNPC = async (partyNex) => {
  try {
    const response = await axios.post(`${API_URL}/npcs/generate`, { partyNex }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error generating NPC:', error);
    throw error;
  }
};

export const rollDice = async (diceType) => {
  try {
    const response = await axios.post(`${API_URL}/dice/roll`, { diceType }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error rolling dice:', error);
    throw error;
  }
};