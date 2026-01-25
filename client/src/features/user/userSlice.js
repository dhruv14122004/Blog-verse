import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    xp: 0,
    level: 1,
    preferences: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addXP: (state, action) => {
            state.xp += action.payload;
            // Simple logic to level up every 100 XP
            const newLevel = Math.floor(state.xp / 100) + 1;
            if (newLevel > state.level) {
                state.level = newLevel;
            }
        },
        updatePreferences: (state, action) => {
            state.preferences = { ...state.preferences, ...action.payload };
        },
    },
});

export const { addXP, updatePreferences } = userSlice.actions;
export default userSlice.reducer;
