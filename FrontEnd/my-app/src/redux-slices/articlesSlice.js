import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

// Thunk to fetch all articles
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await axios.get("/api/article/get-all");
    return response.data;
  }
);

// Thunk to fetch a single article by ID
export const fetchArticleById = createAsyncThunk(
  "articles/fetchArticleById",
  async (id) => {
    const response = await axios.get(`/api/article/get/${id}`);
    return response.data;
  }
);

// Thunk to create a new article
export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/article/create', formData, {
        headers: { 
            'Authorization': localStorage.getItem('token') , 
            'Content-Type': 'multipart/form-data', 
        },
    });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Thunk to edit an article
export const editArticle = createAsyncThunk(
    "articles/editArticle",
    async ({ id, formData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/api/article/edit/${id}`, formData, {
          headers: { 
              'Authorization': localStorage.getItem('token'), 
              'Content-Type': 'multipart/form-data', 
          }
        });
  
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  

// Thunk to delete an article
export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/article/delete/${id}`,{
        headers: { 
            'Authorization': localStorage.getItem('token') 
        }
    });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    article: null // To store the individual article for viewing or editing
  },
  reducers: {
    setArticles: (state, action) => {
      state.data = action.payload;
    },
    setArticle: (state, action) => {
      state.article = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch all articles
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Fetch single article by ID
    builder.addCase(fetchArticleById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.article = action.payload;
    });
    builder.addCase(fetchArticleById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Create a new article
    builder.addCase(createArticle.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data.push(action.payload); // Add the new article to the state
    });
    builder.addCase(createArticle.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Edit an existing article
    builder.addCase(editArticle.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editArticle.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.data.findIndex(
        (article) => article._id === action.payload._id
      );
      if (index !== -1) {
        state.data[index] = action.payload; // Update the edited article in the state
      }
    });
    builder.addCase(editArticle.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Delete an article
    builder.addCase(deleteArticle.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = state.data.filter(
        (article) => article._id !== action.meta.arg
      ); // Remove the deleted article from state
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  }
});

export const { setArticles, setArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
