import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import uiReducer from '../features/ui/uiSlice';
import blogReducer from '../features/blog/blogSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        ui: uiReducer,
        blog: blogReducer,
        user: userReducer,
    },
});
