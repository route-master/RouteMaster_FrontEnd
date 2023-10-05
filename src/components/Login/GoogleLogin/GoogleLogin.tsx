import SocailGoogle from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithSocial, registerWithSocial } from 'store/Slices/users/thunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import styles from './GoogleLogin.module.css';

type Variant = 'LOGIN' | 'REGISTER';

interface Props {
  variant: Variant;
}

const clientId =
  '314019255150-2m0ruvjurs59lboae2uq276vhh4gpiaj.apps.googleusercontent.com';

function GoogleLogin({ variant }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tokens = useAppSelector((state) => state.auth.tokens);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const success = useAppSelector((state) => state.auth.success);
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = (res: any) => {
    if (variant === 'LOGIN') {
      dispatch(
        loginWithSocial({
          provider: 'google',
          body: { accessToken: res.accessToken },
        }),
      );
    } else {
      dispatch(
        registerWithSocial({
          provider: 'google',
          body: {
            accessToken: res.accessToken,
            authorities: ['ROLE_USER'],
          },
        }),
      );
    }
  };

  const onFailure = (res: any) => {
    console.log(res);
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
    <SocailGoogle
      clientId={clientId}
      buttonText="Google Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={styles.btn}
      style={{}}
    />
  );
}

export default GoogleLogin;
