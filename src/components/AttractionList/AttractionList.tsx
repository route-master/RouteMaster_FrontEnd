import { Link, useParams } from 'react-router-dom';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import AttractionItem from './AttractionItem';
import styles from './AttractionList.module.css';

function AttractionList(): JSX.Element {
  const { data, isLoading } = useInfiniteScroll();
  const param = useParams<{ pagetype: string }>();

  return (
    <ul className={styles.container}>
      {isLoading && <div>로딩중...</div>}
      {data.map((item) => (
        <Link
          to={`/attractions/${param.pagetype}/details/${item.contentId}`}
          key={`link-${item.contentId}`}
        >
          <AttractionItem
            id={item.contentId}
            thumb={item.thumbnailImage}
            title={item.title}
          />
        </Link>
      ))}
    </ul>
  );
}

export default AttractionList;
