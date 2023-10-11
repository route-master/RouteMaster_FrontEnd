import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewState {
  name: string;
  rating: number;
  review: string;
  image: string;
}

const initialState: ReviewState = {
  name: '',
  rating: 0,
  review: '',
  image: '',
};

const reviewSlice = createSlice({
  name: 'reviewReducer',
  initialState,
  reducers: {
    updateReviewForm: (state, action: PayloadAction<Partial<ReviewState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateReviewForm } = reviewSlice.actions;

export default reviewSlice.reducer;
