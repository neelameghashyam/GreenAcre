import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from './redux-slices/articlesSlice'; // Import the articles slice

// Configure the Redux store
export const store = configureStore({
  reducer: {
    articles: articlesReducer, // Add the articles reducer to the store
  },
});

export default store;
