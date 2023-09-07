import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  loginWithEmail,
  registerWithEmail,
  checkCodeEmail,
} from 'store/Slices/users/thunks';
import { useNavigate } from 'react-router-dom';
import styles from './EmailAuth.module.css';

type Variant = 'LOGIN' | 'REGISTER';

interface Props {
  variant: Variant;
  setVariant: any;
}

function EmailAuth({ variant, setVariant }: Props): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tokens = useAppSelector((state) => state.auth.tokens);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const success = useAppSelector((state) => state.auth.success);
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const isCheck = useAppSelector((state) => state.auth.isCheck);

  const [code, setCode] = useState('');

  const authWithEmail = () => {
    if (variant === 'LOGIN') {
      if (!username) {
        toast.error('이메일을 입력해주세요');
      } else if (!password) {
        toast.error('비밀번호를 입력해주세요');
      } else {
        dispatch(loginWithEmail({ username, password }));
        if (error) {
          toast.error('이메일이나 비밀번호를 다시한번 확인해주세요!!');
        } else if (!isLoading) {
          console.log(tokens);
        }
      }
    }
    if (variant === 'REGISTER') {
      if (!username) {
        toast.error('이메일을 입력해주세요');
      } else if (!password) {
        toast.error('비밀번호를 입력해주세요');
      } else if (password !== passwordConfirm) {
        toast.error('비밀번호가 일치 하지 않습니다!!');
      } else {
        dispatch(
          registerWithEmail({
            username,
            password,
            authorities: ['ROLE_USER'],
          }),
        );
      }
    }
  };

  const checkCode = () => {
    dispatch(
      checkCodeEmail({
        username,
        verificationCode: code,
      }),
    );
  };

  useEffect(() => {
    if (variant === 'LOGIN' && isLogin) {
      localStorage.setItem('accessToken', tokens.accessToken.token);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [success, isLogin]);

  useEffect(() => {
    if (isCheck) {
      toast.success('회원가입 완료');
      setVariant('LOGIN');
      navigate('/login');
    }
  }, [isCheck]);

  if (success && variant === 'REGISTER') {
    return (
      <div>
        <div>이메일로 발송된 인증 코드를 입력해주세요</div>
        <input
          type="text"
          name="code"
          id="code"
          onChange={({ target: { value } }) => {
            setCode(value);
          }}
        />
        <button type="submit" onClick={checkCode}>
          확인
        </button>
      </div>
    );
  }
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
        onClick={authWithEmail}
      >
        {variant === 'LOGIN' ? 'Login' : 'Register'}
      </button>
      <ToastContainer />
    </div>
  );
}

export default EmailAuth;
