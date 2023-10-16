import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PlanObj {
  id: string | null;
  name: string;
  description: string;
  thumbnailimageUrl: string;
  beginDate: string;
  endDate: string;
}

const requestURL = `http://api.route-master.org/plan/group`;

export const fetchPlan = createAsyncThunk('/plans/fetch', async () => {
  const response = await axios.get(requestURL, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response) {
    throw new Error('Network response was not ok');
  }
  return response.data;
});

export const postPlan = createAsyncThunk(
  '/plans/post',
  async (arg: { planObj: PlanObj }) => {
    const response = await axios.post(requestURL, {
      headers: { 'Content-Type': 'application/json' },
      data: arg.planObj,
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);

export const deletePlan = createAsyncThunk(
  '/plans/delete',
  async (arg: { planId: number }) => {
    const response = await axios.delete(`${requestURL}/${arg.planId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);
