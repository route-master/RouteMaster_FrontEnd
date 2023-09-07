import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://34.64.158.170:30100';
const baseHeader = {
  'Content-Type': 'application/json',
  'Allow-Access-Control': 'http://34.64.158.170:30100',
};

export const loginWithEmail = createAsyncThunk(
  'user/email/login',
  async (arg: { username: string; password: string }) => {
    const requestURL = `${baseURL}/v1/user/email/login`;

    const response = await axios({
      url: requestURL,
      method: 'PATCH',
      headers: { ...baseHeader },
      data: arg,
    });
    if (!response) {
      throw new Error('로그인 실패!!');
    }
    return response.data.tokens;
  },
);

export const registerWithEmail = createAsyncThunk(
  'user/email/register',
  async (arg: {
    username: string;
    password: string;
    authorities: string[];
  }) => {
    const requestURL = `${baseURL}/v1/user/email/register`;

    const response = await axios({
      url: requestURL,
      method: 'POST',
      headers: { ...baseHeader },
      data: arg,
    });
    if (!response) {
      throw new Error('회원가입 실패!!');
    }
    return response.data.username;
  },
);

export const loginWithSocial = createAsyncThunk(
  'user/social/login',
  async (arg: {
    provider: string;
    body: {
      accessToken: string;
    };
  }) => {
    const requestURL = `${baseURL}/v1/user/social/${arg.provider}/login`;

    const response = await axios({
      url: requestURL,
      method: 'PATCH',
      headers: { ...baseHeader },
      data: arg.body,
    });
    if (!response) {
      throw new Error('소셜 로그인 실패!!');
    }
    return response.data.tokens;
  },
);
export const registerWithSocial = createAsyncThunk(
  'user/social/register',
  async (arg: {
    provider: string;
    body: {
      accessToken: string;
      authorities: string[];
    };
  }) => {
    const requestURL = `${baseURL}/v1/user/social/${arg.provider}/register`;

    const response = await axios({
      url: requestURL,
      method: 'POST',
      headers: { ...baseHeader },
      data: arg.body,
    });

    if (!response) {
      throw new Error('소셜 회원가입 실패');
    }
    return response.data.id;
  },
);

export const checkCodeEmail = createAsyncThunk(
  'user/email/verify',
  async (arg: { username: string; verificationCode: string }) => {
    const requestURL = `${baseURL}/v1/user/email/register/verification`;

    const response = await axios({
      url: requestURL,
      method: 'POST',
      headers: { ...baseHeader },
      data: arg,
    });

    if (!response) {
      throw new Error('이메일 검증 실패');
    }
    return response.data.username;
  },
);

export const privacyCheck = createAsyncThunk(
  'user/privacy/me',
  async() => {
    const requestURL = `${baseURL}/v1/user/info/privacy/me`

    const response = await axios({
      url: requestURL,
      method: 'GET',
      headers: {...baseHeader},
    })
    if(!response) {
      throw new Error('회원가입 실패!');
    }
    return response.data.userPrivacies;
  }
)

export const privacyApprove = createAsyncThunk(
  'user/privacy',
  async(arg: {privacyGroupId:  string; isApproved:  string}) => {
    const requestURL = `${baseURL}/v1/user/info/privacy`

    const response = await axios({
      url: requestURL,
      method: 'POST',
      headers: {...baseHeader},
    })
    if(!response) {
      throw new Error('문제 발생!!')
    }
    return response.data.userPrivacies;
  } 
)

