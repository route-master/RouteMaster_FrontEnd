import SocialKaKao from 'react-kakao-login';
import { loginWithSocial, registerWithSocial } from 'store/Slices/users/thunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
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

  const tokens = useAppSelector((state) => state.auth.tokens);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const success = useAppSelector((state) => state.auth.success);
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const kakaoOnSuccess = async (data: UserData) => {
    if (variant === 'LOGIN') {
      dispatch(
        loginWithSocial({
          provider: 'kakao',
          body: { accessToken: data.response.access_token },
        }),
      );
    } else {
      dispatch(
        registerWithSocial({
          provider: 'kakao',
          body: {
            accessToken: data.response.access_token,
            authorities: ['ROLE_USER'],
          },
        }),
      );
    }
  };
  const kakaoOnFailure = (error: object) => {
    console.log(error);
  };

  useEffect(() => {
    if (variant === 'LOGIN' && isLogin) {
      localStorage.setItem('accessToken', tokens.accessToken.token);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [success, isLogin]);

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
