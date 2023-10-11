import MainHeader from 'components/MainHeader/MainHeader';
import RecommendCardContainer from 'components/RecommendCard/RecommendCardContainer';
import Calendar from '../../components/Calendar/Calendar';
import styles from './Main.module.css';

function Main(): JSX.Element {
  return (
    <div className={styles.container}>
      <MainHeader />
      <div className={styles.search_container}> {} </div>
      <div className={styles.recommend_container}>
        <h1>추천 검색어</h1>
        <RecommendCardContainer title="내 주변 인기" />
        <RecommendCardContainer title="20대 인기" />
        <RecommendCardContainer title="날씨별 추천" />
      </div>
      <div className={styles.calendar}>
        <Calendar />
      </div>
    </div>
  );
}

export default Main;
