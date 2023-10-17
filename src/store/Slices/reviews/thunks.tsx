import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://api.route-master.org';
const baseHeader = {
  'Content-Type': 'application/json',
  'Allow-Access-Control': 'http://34.64.158.170:30100',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};

export const saveReview = createAsyncThunk(
  'attraction/save/review',
  async (arg: {
    userId: string;
    contentId: string;
    reviewComment: string;
    imageUrl: string;
    rating: number;
  }) => {
    const requestURL = `${baseURL}/attraction/review/save`;

    const response = await axios({
      url: requestURL,
      method: 'POST',
      headers: { ...baseHeader },
      data: arg,
    });
    if (!response) {
      throw new Error('리뷰 작성 실패');
    }

    return response.data;
  },
);

export const getReviewByContentId = createAsyncThunk(
  '/attraction/review/contentId',
  async (arg: { contentId: string }) => {
    const requestUrl = `${baseURL}/attraction/review/list/${arg.contentId}`;

    const response = await axios({
      url: requestUrl,
      method: 'GET',
      headers: { ...baseHeader },
    });

    if (!response) {
      throw Error('리뷰 불러오기 실패');
    }

    return response.data;
  },
);

export const getImageUrlsByContentId = createAsyncThunk(
  '/attraction/imageUrls/contentid',
  async (arg: { contentId: string }) => {
    const requestURL = `${baseURL}/attraction/review/list/reviewImages/${arg.contentId}}`;

    const response = await axios({
      url: requestURL,
      method: 'GET',
      headers: { ...baseHeader },
    });

    if (!response) {
      throw Error('불러오기 실패!');
    }

    return response.data;
  },
);

export const deleteReview = createAsyncThunk(
  'attraction/delete/review',
  async (arg: { contentId: string }) => {
    const requestUrl = `${baseURL}/attraction/review/delete/${arg.contentId}`;

    const response = await axios({
      url: requestUrl,
      method: 'DELETE',
      headers: { ...baseHeader },
    });

    if (!response) {
      throw Error('리뷰 삭제 실패');
    }

    return response.data;
  },
);
