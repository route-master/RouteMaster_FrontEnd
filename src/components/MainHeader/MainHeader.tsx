import { Link } from 'react-router-dom';
import styles from './MainHeader.module.css';
import LogoImage from '../../assets/images/logo_green.png';

function MainHeader(): JSX.Element {
  return (
    <header className={styles.container}>
      <div className={styles.header_top}>
        <div className={styles.logo_container}>
          <div className={styles.img_container}>
            <Link to="/">
              <img src={LogoImage} alt="logo" className={styles.logo_img} />
            </Link>
          </div>
          <div className={styles.header_name}>
            <h1>Route Master</h1>
          </div>
        </div>
        <div className={styles.header_btn_container}>
          <button type="button" className={styles.header_btn}>
            <Link to="/plan-list">Trips</Link>
          </button>
          <button type="button" className={styles.header_btn}>
            <Link to="/">Language</Link>
          </button>
          <button id="login-btn" type="button" className={styles.header_btn}>
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>

      <div className={styles.header_bottom}>
        <ul className={styles.nav}>
          <li className={styles.nav_item}>
            <button type="button" className={styles.nav_btn}>
              <Link to="/attractions">Hotels</Link>
            </button>
          </li>
          <li className={styles.nav_item}>
            <button type="button" className={styles.nav_btn}>
              <Link to="/">Flights</Link>
            </button>
          </li>
          <li className={styles.nav_item}>
            <button type="button" className={styles.nav_btn}>
              <Link to="/attractions">Activities</Link>
            </button>
          </li>
          <li className={styles.nav_item}>
            <button type="button" className={styles.nav_btn}>
              <Link to="/">Rentals</Link>
            </button>
          </li>
          <li className={styles.nav_item}>
            <button type="button" className={styles.nav_btn}>
              <Link to="/restaurant">Restaurants</Link>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default MainHeader;
