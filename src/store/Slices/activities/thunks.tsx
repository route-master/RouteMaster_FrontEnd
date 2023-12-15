import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PostActivity {
  planGroupId: string;
  name: string;
  description?: string;
  beginDate: string;
  endDate: string;
  mapInfo?: { lat: number; lng: number };
  activityType: 'HOTEL' | 'RESTAURANT' | 'ACTIVITY' | 'UNKNOWN';
  referenceType: 'TOUR_API' | 'KAKAO_MAP';
  referenceId: string; // 액티비티 id
}
interface UpdateActivity {
  createdAt: string | null;
  updatedAt: string | null;
  id: string;
  planGroupId: string;
  writer: string;
  name: string | null;
  description: string;
  beginDate: string;
  endDate: string;
  mapInfo: { lat: number; lng: number } | null;
  thumbnailImageUrl: string | null;
  activityType: 'HOTEL' | 'RESTAURANT' | 'ACTIVITY' | 'UNKNOWN';
  paymentInfo: PaymentLogs;
  referenceType: string;
  referenceId: string;
  planPaymentInfo?: PaymentLogs;
}
interface PaymentLogs {
  paymentLogs: Log[];
}
interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

const baseURL = 'http://api.route-master.org/plan/activity';
const baseHeader = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};

export const fetchActivities = createAsyncThunk(
  'activities/fetch',
  async (arg: { id: string }) => {
    const response = await axios.get(`${baseURL}/list?planGroupId=${arg.id}`, {
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
  async (arg: { activityObj: PostActivity | UpdateActivity }) => {
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
