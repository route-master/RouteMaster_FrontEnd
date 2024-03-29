import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PlanObj {
  id: null;
  name: string;
  description: string;
  thumbnailImageUrl: string | null;
  beginDate: string;
  endDate: string;
}

const header = {
  'Content-Type': 'application/json',
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
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);

export const deletePlan = createAsyncThunk(
  '/plans/delete',
  async (arg: { planId: string }) => {
    const response = await axios.delete(`${requestURL}/${arg.planId}`, {
      headers: header,
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);

export const joinPlan = createAsyncThunk(
  '/plans/invite',
  async (arg: { id: string; planId: string }) => {
    const response = await axios.post(
      `${requestURL}/${arg.planId}/invite?invite=${arg.id}`,
      { id: arg.planId, invite: arg.id },
      { headers: header },
    );
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);

export const leavePlan = createAsyncThunk(
  '/plans/exit',
  async (arg: { id: string; planId: string }) => {
    const response = await axios.post(`${requestURL}/${arg.id}/exit`, {
      data: {
        id: arg.id,
        invite: arg.planId,
      },
      headers: header,
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);
