import SocailGoogle from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import {
  useLoginGoogleUserMutation,
  useRegisterGoogleUserMutation,
} from 'services/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'features/auth/authSlice';
import styles from './GoogleLogin.module.css';

type Variant = 'LOGIN' | 'REGISTER';

interface Props {
  variant: Variant;
}

const clientId =
  '314019255150-2m0ruvjurs59lboae2uq276vhh4gpiaj.apps.googleusercontent.com';

function GoogleLogin({ variant }: Props): JSX.Element {
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
  ] = useLoginGoogleUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterGoogleUserMutation();

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
      loginUser({ accessToken: res.accessToken });
    } else {
      registerUser({ accessToken: res.accessToken, authorities: 'ROLE_USER' });
    }
  };

  const onFailure = (res: any) => {
    console.log(res);
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
