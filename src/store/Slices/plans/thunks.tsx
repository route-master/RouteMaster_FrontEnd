import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PlanObj {
  id: string | null;
  name: string;
  description: string;
  thumbnailImageUrl: string;
  beginDate: string;
  endDate: string;
}

const header = {
  'Content-Type': 'application/json',
  'Allow-Access-Control': 'http://34.64.158.170:30000',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};

const requestURL = `http://api.route-master.org/plan/group`;

export const fetchPlan = createAsyncThunk('/plans/fetch', async () => {
  const response = await axios.get(requestURL, {
    headers: header,
  });
  if (!response) {
    throw new Error('Network response was not ok');
  }
  return response.data;
});

export const postPlan = createAsyncThunk(
  '/plans/post',
  async (arg: { planObj: PlanObj }) => {
    const response = await axios.post(requestURL, arg.planObj, {
      headers: header,
    });
    console.log('response: ', response);
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);

export const deletePlan = createAsyncThunk(
  '/plans/delete',
  async (arg: { planId: number }) => {
    const response = await axios.delete(`${requestURL}/${arg.planId}`, {
      headers: header,
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);
