import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://34.64.158.170:30100';
const baseHeader = {
  'Content-Type': 'application/json',
  'Allow-Access-Control': 'http://34.64.158.170:30100',
  Authorization: ``,
};

export const changeBaseHeader = () => {
  baseHeader.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
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

export const updatePassword = createAsyncThunk(
  'user/email/update/password',
  async (arg: { password: string }) => {
    changeBaseHeader();
    const requestURL = `${baseURL}/v1/user/email/update/password`;

    const response = await axios({
      url: requestURL,
      method: 'PATCH',
      headers: { ...baseHeader },
      data: arg,
    });
    if (!response) {
      throw new Error('비밀번호 변경 실패');
    }
  },
);

export const getPrivacyAll = createAsyncThunk('user/privacy/all', async () => {
  const requestUrl = `${baseURL}/v1/privacy/all`;

  const response = await axios({
    url: requestUrl,
    method: 'GET',
    headers: { ...baseHeader },
  });
  if (!response) {
    throw new Error('개인정보 이용 동의 정책을 가져오지 못했습니다!');
  }
  return response.data;
});

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

export const privacyApprove = createAsyncThunk(
  'user/privacy',
  async (arg: { privacyGroupId: string; isApproved: string }) => {
    const requestURL = `${baseURL}/v1/user/info/privacy`;

    const response = await axios({
      url: requestURL,
      method: 'POST',
      headers: { ...baseHeader },
      data: arg,
    });
    if (!response) {
      throw new Error('문제 발생!!');
    }
    return response.data.userPrivacies;
  },
);

export const privacyCheck = createAsyncThunk('user/privacy/me', async () => {
  const requestURL = `${baseURL}/v1/user/info/privacy/me`;

  const response = await axios({
    url: requestURL,
    method: 'GET',
    headers: { ...baseHeader },
  });
  if (!response) {
    throw new Error('회원가입 실패!');
  }
  return response.data.userPrivacies;
});

export const setProfile = createAsyncThunk(
  'user/profile/set',
  async (arg: {
    profile: {
      nickname: string;
      birthDate: string;
      profileImageUrl: string;
      accessType: string;
    };
    access: {
      birthDate: boolean;
      profileImageUrl: boolean;
    };
  }) => {
    const requestURL = `${baseURL}/v1/user/info/profile`;

    const response = await axios({
      url: requestURL,
      method: 'POST',
      headers: { ...baseHeader },
      data: arg,
    });
    if (!response) {
      throw new Error('프로필 등록 실패');
    }
    return response.data;
  },
);

export const getUserProfile = createAsyncThunk(
  'user/profile/id',
  async (arg: { id: string }) => {
    const requestURL = `${baseURL}/v1/user/info/profile/${arg.id}`;

    const response = await axios({
      url: requestURL,
      method: 'GET',
      headers: { ...baseHeader },
    });
    if (!response) {
      throw new Error('프로필 읽기 실패');
    }
    return response.data;
  },
);

export const getUserProfileList = createAsyncThunk(
  'user/profile/list',
  async (arg: { ids: string[] }) => {
    changeBaseHeader();
    let requestURL = `${baseURL}/v1/user/info/profile/list?`;
    // eslint-disable-next-line no-return-assign
    arg.ids.forEach((id) => (requestURL += `baseUserIds=${id}&`));
    requestURL = requestURL.slice(0, -1).trim();

    const response = await axios({
      url: requestURL,
      method: 'GET',
      headers: { ...baseHeader },
    });
    if (!response) {
      throw new Error('프로필 목록 불러오기 실패');
    }
    return response.data.profiles;
  },
);

export const getMyProfile = createAsyncThunk('user/profile/me', async () => {
  changeBaseHeader();
  const requestURL = `${baseURL}/v1/user/info/profile/me`;

  const response = await axios({
    url: requestURL,
    method: 'GET',
    headers: { ...baseHeader },
  });
  if (!response) {
    throw new Error('fail to read my profile');
  }
  return response.data;
});

export const getNicknameById = createAsyncThunk(
  'user/nickname/id',
  async (id: string) => {
    changeBaseHeader();
    const requestURL = `${baseURL}/v1/user/info/profile/nickname/${id}`;

    const response = await axios({
      url: requestURL,
      method: 'GET',
      headers: { ...baseHeader },
    });
    if (!response) {
      throw new Error('fail to load nickname by id');
    }
    return response.data;
  },
);

export const getNickNamesById = createAsyncThunk(
  'user/nickname/list',
  async (arg: { ids: string[] }) => {
    changeBaseHeader();
    const queryParams = arg.ids.map((id) => `baseUserIds=${id}`).join('&');
    const requestURL = `${baseURL}/v1/user/info/profile/nickname/list?${queryParams}`;

    const response = await axios({
      url: requestURL,
      method: 'GET',
      headers: { ...baseHeader },
    });
    if (!response) {
      throw new Error('failed to load nicknames');
    }
    return response.data;
  },
);

export const deleteUser = createAsyncThunk('user/delete', async () => {
  const requestURL = `${baseURL}/v1/user`;

  const response = await axios({
    url: requestURL,
    method: 'DELETE',
    headers: { ...baseHeader },
  });
  if (!response) {
    throw new Error('failed to delete user');
  }
});

export const userAuthority = createAsyncThunk(
  'user/authority',
  async (arg: {
    clientId: string;
    clientSecret: string;
    accessToken: string;
  }) => {
    const requestURL = `${baseURL}/v1/user/authorities`;

    const response = await axios({
      url: requestURL,
      method: 'POST',
      headers: { ...baseHeader },
      data: arg,
    });
    if (!response) {
      throw new Error('failed to authorize user');
    }
    return response.data;
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  const requestURL = `${baseURL}/v1/user/logout`;

  const response = await axios({
    url: requestURL,
    method: 'PATCH',
    headers: { ...baseHeader },
  });
  if (!response) {
    throw new Error('failed to logout');
  }
});

export const userInfoSetting = createAsyncThunk(
  'user/info/setting',
  async () => {
    const requsetURL = `${baseURL}/v1/user/info/setting`;

    const response = await axios({
      url: requsetURL,
      method: 'GET',
      headers: { ...baseHeader },
    });
    if (!response) {
      throw new Error('failed to load user settings!');
    }
    return response.data.setting;
  },
);

export const posetUserSetting = createAsyncThunk(
  'user/info/setting',
  async (arg: { language: string; timeZone: string }) => {
    const requestURL = `${baseURL}/v1/user/info/setting`;

    const response = await axios({
      url: requestURL,
      method: 'POST',
      headers: { ...baseHeader },
      data: arg,
    });
    if (!response) {
      throw new Error('failed to setting');
    }
    return response.data.setting;
  },
);
