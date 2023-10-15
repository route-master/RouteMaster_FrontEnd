/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getMyProfile } from 'store/Slices/users/thunks';
import { useEffect, useState } from 'react';
import MainHeader from 'components/MainHeader/MainHeader';
import RecommendCardContainer from 'components/RecommendCard/RecommendCardContainer';
import styles from './Main.module.css';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const [age, setAge] = useState(20); // default age = 20
  const profilesState = useAppSelector((state) => state.profile.profiles);

  useEffect(() => {
    dispatch(getMyProfile());
    console.log(profilesState[0]);
    if (profilesState[0]) {
      console.log(profilesState[0].profile.birthDate);
      const birthDate: number = +profilesState[0].profile.birthDate;
      setAge(Math.floor(birthDate / 10) * 10);
    }
  }, [dispatch, profilesState]);

  return (
    <div className={styles.container}>
      <div className={styles.mainheader}>
        <MainHeader />
      </div>
      <div className={styles.search_container}>
        <button type="button" className={styles.link_to_planlist}>
          <Link to="/plan-list">Trips</Link>
        </button>
      </div>
      <div className={styles.recommend_container}>
        <h1>추천 검색어</h1>
        <RecommendCardContainer type="내주변" />
        <RecommendCardContainer type="나이별" age={age} />
        <RecommendCardContainer type="날씨별" />
      </div>
    </div>
  );
}

export default Main;
