import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

const URL = 'http://api.route-master.org/plan/acttivity/payment';

export const postLogs = createAsyncThunk(
  'form/postLogs',
  async (arg: { logs: Log[]; id: string }) => {
    const data = {
      id: arg.id,
      paymentInfo: arg.logs,
    };

    const response = await axios.post(URL, data);

    if (!response) {
      throw new Error('Network response was not ok');
    }
  },
);
