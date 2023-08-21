import MainHeader from 'components/MainHeader/MainHeader';
import RecommendCardContainer from 'components/RecommendCard/RecommendCardContainer';
import Calendar from '../../components/Calendar/Calendar';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './main.module.css';

function Main(): JSX.Element {
  return (
    <div className={styles.body}>
      <MainHeader />
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <div className={styles.recommend_container}>
        <h1>추천 검색어</h1>
        <RecommendCardContainer title="내 주변 인기" />
        <RecommendCardContainer title="20대 인기" />
        <RecommendCardContainer title="날씨별 추천" />
      </div>
      <div
        style={{
          width: '50%',
          aspectRatio: '1/1',
          margin: '0 auto',
          marginTop: '5%',
        }}
      >
        <Calendar />
      </div>
    </div>
  );
}

export default Main;
