import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const NumOfRows = 10;

export const fetchAttractionsByType = createAsyncThunk(
  '/attractions/fetchByType',
  async (arg: { type: string; page: number }) => {
    let requestURL;
    if (arg.type === 'stay') {
      requestURL = `/attraction/search/${arg.type}?numOfRows=${NumOfRows}&pageNo=${arg.page}&arrange=A&areaCode=1&sigunguCode=1`;
    } else if (arg.type === 'event') {
      requestURL = `/attraction/search/${arg.type}?numOfRows=${NumOfRows}&pageNo=${arg.page}&arrange=A&eventStartDate=20230701&areaCode=1&sigunguCode=1`;
    } else {
      requestURL = `/attraction/search/${arg.type}?numOfRows=${NumOfRows}&pageNo=${arg.page}&arrange=A&areaCode=1&sigunguCode=1`;
    }

    const response = await axios.get(requestURL, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
    return response.data.attractions;
  },
);
