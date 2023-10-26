import { createSlice } from '@reduxjs/toolkit';
import { getReviewByContentId } from './thunks';

interface Review {
  id: string;
  userId: string;
  contentId: string;
  reviewComment: number;
  rating: number;
  imageUrl: string;
}

interface ReviewState {
  reviews: Review[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: 'idle',
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviewReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewByContentId.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getReviewByContentId.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(getReviewByContentId.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default reviewSlice.reducer;
