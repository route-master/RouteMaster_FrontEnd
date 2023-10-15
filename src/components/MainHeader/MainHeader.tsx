import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import LogoImage from '../../assets/images/logo_green.png';
import styles from './MainHeader.module.css';

function MainHeader(): JSX.Element {
  return (
    <header className={styles.container}>
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
      <ul className={styles.nav}>
        <li className={styles.nav_item}>
          <button type="button" className={styles.nav_btn}>
            <Link to="/attractions/stay">Hotels</Link>
          </button>
        </li>
        <li className={styles.nav_item}>
          <button type="button" className={styles.nav_btn}>
            <Link to="/attractions/event">Activities</Link>
          </button>
        </li>
        <li className={styles.nav_item}>
          <button type="button" className={styles.nav_btn}>
            <Link to="/attractions/restaurant">Restaurants</Link>
          </button>
        </li>
      </ul>
      <div className={styles.searchbar}>
        <SearchBar />
      </div>
      <button id="login-btn" type="button" className={styles.login_btn}>
        <Link to="/login">Login</Link>
      </button>
    </header>
  );
}

export default MainHeader;
