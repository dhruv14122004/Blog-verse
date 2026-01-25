import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuOpen: false,
    isFocusMode: false,
    activeModal: null,
    hasSeenIntro: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIntroSeen: (state) => {
            state.hasSeenIntro = true;
        },
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        setMenuOpen: (state, action) => {
            state.isMenuOpen = action.payload;
        },
        toggleFocusMode: (state) => {
            state.isFocusMode = !state.isFocusMode;
        },
        openModal: (state, action) => {
            state.activeModal = action.payload;
        },
        closeModal: (state) => {
            state.activeModal = null;
        },
    },
});

export const { toggleMenu, setMenuOpen, toggleFocusMode, openModal, closeModal, setIntroSeen } = uiSlice.actions;
export default uiSlice.reducer;
