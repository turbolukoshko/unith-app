import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImages } from "../services/api";

interface ImageItem {
  title: string;
  description?: string;
  image: string;
  index: number;
}

interface ImageState {
  loading: boolean;
  data: Record<string, ImageItem> | null;
  error: string | undefined;
  lastValidData: Record<string, ImageItem> | null;
}

const initialState: ImageState = {
  loading: true,
  data: null,
  error: undefined,
  lastValidData: null,
};

export const fetchAllImages = createAsyncThunk("images/fetchAll", async () => {
  const data = await fetchImages();
  return data;
});

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllImages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastValidData = action.payload;
        state.error = undefined;
      })
      .addCase(fetchAllImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;
