import { Link, useParams } from 'react-router-dom';
import { Hotel } from 'utils/filter';
import { useEffect } from 'react';
import AttractionItem from './AttractionItem';
import styles from './AttractionList.module.css';

interface Props {
  data: Hotel[];
  isLoading: boolean;
}

function AttractionList({ data, isLoading }: Props): JSX.Element {
  const param = useParams<{ pagetype: string }>();

  return (
    <ul className={styles.container}>
      {isLoading && <div>로딩중...</div>}
      {data.map((item) => (
        <Link
          to={`/attractions/${param.pagetype}/details/${item.contentId}?mapX=${item.mapX}&mapY=${item.mapY}&title=${item.title}`}
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
