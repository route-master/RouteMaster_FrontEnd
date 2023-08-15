import SocialKaKao from 'react-kakao-login';
import {
  useLoginKaKaoUserMutation,
  useRegisterKaKaoUserMutation,
} from 'services/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'features/auth/authSlice';
import { useEffect } from 'react';
import styles from './KakaoLogin.module.css';

interface UserData {
  response: {
    access_token: string;
  };
}

type Variant = 'LOGIN' | 'REGISTER';

interface Props {
  variant: Variant;
}

function KakaoLogin({ variant }: Props): JSX.Element {
  const kakaoClientId = '04e51adfeb37816173428908a9f46ab6';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginKaKaoUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterKaKaoUserMutation();

  const kakaoOnSuccess = async (data: UserData) => {
    if (variant === 'LOGIN') {
      loginUser({ accessToken: data.response.access_token });
    } else {
      registerUser({
        accessToken: data.response.access_token,
        authorities: 'ROLE_USER',
      });
    } // 엑세스 토큰 백엔드로 전달
  };
  const kakaoOnFailure = (error: object) => {
    console.log(error);
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('user login');
      dispatch(setUser({ tokens: loginData.tokens }));
      navigate('/');
    }

    if (isRegisterSuccess) {
      toast.success('register');
      navigate('/login');
    }
  }, [isLoginSuccess, isRegisterSuccess]);

  return (
    <SocialKaKao
      token={kakaoClientId}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
      className={styles.btn}
      style={{}}
    />
  );
}

export default KakaoLogin;
