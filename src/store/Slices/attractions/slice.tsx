import { createSlice } from '@reduxjs/toolkit';
import { fetchAttractionsByType } from './thunks';

interface Attraction {
  title: string;
  largeCategory: string;
  mediumCategory: string;
  smallCategory: string;
  mapX: number;
  mapY: number;
  areaCode: number;
  sigunguCode: number;
  mapLevel: number;
  address: string;
  detailAddress: string;
  contentId: number;
  contentTypeId: number;
  copyrightType: string;
  image: string;
  thumbnailImage: string;
  createdTime: string;
  modifiedTime: string;
  bookTour: boolean;
  tel: string;
  benikia: boolean;
  goodStay: boolean;
  hanok: boolean;
}

interface State {
  attractions: Attraction[];
  currentPage: number;
  isLoading: boolean;
  error: string;
  hasNextPage: boolean;
}

const initialState: State = {
  attractions: [],
  currentPage: 1,
  isLoading: false,
  error: '',
  hasNextPage: true,
};

const NumOfRows = 10;

const attractionsSlice = createSlice({
  name: 'attractions',
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttractionsByType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAttractionsByType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attractions = [...state.attractions, ...action.payload];
        state.currentPage += 1;
        state.hasNextPage = action.payload.length === NumOfRows;
      })
      .addCase(fetchAttractionsByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      });
  },
});

export const { resetState } = attractionsSlice.actions;
export default attractionsSlice.reducer;
