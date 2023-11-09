import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EmailAuth from '../../components/Login/EmailAuth/EmailAuth';
import KakaoLogin from '../../components/Login/KakaoLogin/KakaoLogin';
import styles from './Auth.module.css';

type Variant = 'LOGIN' | 'REGISTER';

function Login(): JSX.Element {
  const [variant, setVariant] = useState<Variant>('LOGIN');

  const toggleVariant = () => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        <Link to="/" className={styles.logo}>
          Route Master
        </Link>
      </h1>
      <EmailAuth variant={variant} setVariant={setVariant} />
      <KakaoLogin variant={variant} />
      {variant === 'LOGIN' ? (
        <div className={styles.btn} onClick={toggleVariant} aria-hidden="true">
          <p>로그인</p>
        </div>
      ) : (
        <Link to="/terms-of-use" className={styles.btn}>
          <div onClick={toggleVariant} aria-hidden="true">
            <p>회원가입</p>
          </div>
        </Link>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
