import { useEffect, useState } from 'react';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from 'services/authApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'features/auth/authSlice';
import styles from './EmailAuth.module.css';

type Variant = 'LOGIN' | 'REGISTER';

interface Props {
  variant: Variant;
}

function EmailAuth({ variant }: Props): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useDispatch();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleClickEvent = () => {
    if (variant === 'LOGIN') {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleLogin = async () => {
    if (username && password) {
      await loginUser({ username, password });
    } else {
      toast.error('please fill all input fields');
    }
  };

  const handleRegister = async () => {
    if (username && password && passwordConfirm) {
      if (password !== passwordConfirm) {
        toast.error('비밀번호를 다시확인해 주세요!');
      } else {
        await registerUser({ username, password, authorities: 'ROLE_USER' });
      }
    } else {
      toast.error('please fill all input fields');
    }
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
    <div className={styles.body}>
      <div className={styles.input_container}>
        <label htmlFor="username">
          <b> Username </b>
        </label>
        <input
          className={styles.input}
          id="username"
          type="text"
          placeholder="Enter User Name"
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="userpwd">
          <b> Password </b>
        </label>
        <input
          className={styles.input}
          id="userpwd"
          type="password"
          placeholder="Enter password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      {variant === 'REGISTER' && (
        <div className={styles.input_container}>
          <label htmlFor="userpwdconfirm">
            <b> Password Confirm </b>
          </label>
          <input
            className={styles.input}
            id="userpwdconfirm"
            type="password"
            placeholder="Check password"
            onChange={({ target: { value } }) => setPasswordConfirm(value)}
          />
        </div>
      )}
      <button
        className={styles.login_btn}
        type="submit"
        onClick={handleClickEvent}
      >
        {variant === 'LOGIN' ? 'Login' : 'Register'}
      </button>
    </div>
  );
}

export default EmailAuth;
