import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    categories: [],
    activePost: null,
    loading: false,
    error: null,
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setActivePost: (state, action) => {
            state.activePost = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setPosts, setCategories, setActivePost, setLoading, setError } = blogSlice.actions;
export default blogSlice.reducer;
