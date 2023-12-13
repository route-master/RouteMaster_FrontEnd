import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PostActivity {
  planId: string;
  name: string;
  beginDate: string;
  endDate: string;
  activityType: 'HOTEL' | 'RESTAURANT' | 'ACTIVITY' | 'UNKNOWN';
  referenceType: 'TOUR_API' | 'KAKAO_MAP';
  referenceId: string; // 액티비티 id
}

const baseURL = 'http://api.route-master.org/plan/activity';
const baseHeader = {
  'Content-Type': 'application/json',
  'Allow-Access-Control': `${baseURL}`,
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};

export const fetchActivities = createAsyncThunk(
  'activities/fetch',
  async () => {
    const response = await axios.get(`${baseURL}/list`, {
      headers: baseHeader,
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  },
);

export const addActivity = createAsyncThunk(
  'activities/add',
  async (arg: { activityObj: PostActivity }) => {
    const response = await axios.post(baseURL, arg.activityObj, {
      headers: baseHeader,
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);

export const deleteActivity = createAsyncThunk(
  'activities/delete',
  async (arg: { id: string }) => {
    const response = await axios.delete(`${baseURL}/${arg.id}`, {
      headers: baseHeader,
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);
