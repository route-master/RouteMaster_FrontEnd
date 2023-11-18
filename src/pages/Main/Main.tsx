import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { useEffect, useState } from 'react';
import MainHeader from 'components/MainHeader/MainHeader';
import RecommendCardContainer from 'components/RecommendCard/RecommendCardContainer';
import styles from './Main.module.css';

function Main(): JSX.Element {
  const [age, setAge] = useState(20); // default age = 20
  const profilesState = useAppSelector(
    (state) => state.profile.profiles[0].profile,
  );

  // set age
  useEffect(() => {
    if (profilesState) {
      const birthDate: number = +profilesState.birthDate;
      setAge(Math.floor(birthDate / 10) * 10);
    }
  }, [profilesState]);

  return (
    <div className={styles.container}>
      <div className={styles.mainheader}>
        <MainHeader />
      </div>
      <div className={styles.planbox}>
        <h1>여행 계획을 세워보세요!</h1>
        여행을 갈 때마다 생기는 무수한 파일들이 지겹지 않나요? <br />
        어디에 무슨 일정이 있는지 헷갈리셨나요? <br />
        이제 RouteMaster와 함께 여행을 효과적으로 관리해보세요!
        <button type="button" className={styles.link_to_planlist}>
          <Link to="/plan-list">플랜 만들러 바로가기</Link>
        </button>
      </div>
      <div className={styles.recommend_container}>
        <h1>추천 검색어</h1>
        <RecommendCardContainer type="내주변" />
        <RecommendCardContainer type="나이별" age={age} />
        <RecommendCardContainer type="내주변" />
      </div>
    </div>
  );
}

export default Main;
