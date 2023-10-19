import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

const header = {
  'Content-Type': 'application/json',
  'Allow-Access-Control': 'http://34.64.158.170:30000',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};

const URL = 'http://api.route-master.org/plan/acttivity/payment';

export const postLogs = createAsyncThunk(
  'form/postLogs',
  async (arg: { logs: Log[]; id: string }) => {
    const mydata = {
      id: arg.id,
      paymentInfo: arg.logs,
    };

    const response = await axios.post(URL, {
      headers: header,
      data: mydata,
    });

    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);
