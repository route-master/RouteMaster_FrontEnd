import { useEffect, useState } from 'react';
import FilteringBox from './FilteringBox';
import styles from './SideFilteringBar.module.css';

interface Props {
  type: string;
}

function SideFilteringBar({ type }: Props): JSX.Element {
  type Dict = { category: string; options: string[] };
  const [dict, setDict] = useState<Dict[]>([]);
  useEffect(() => {
    if (type === 'hotels') {
      setDict([
        { category: '등급별', options: ['4성', '3성', '2성'] },
        { category: '타입별', options: ['호텔', '모텔', '한옥'] },
      ]);
    } else if (type === 'activities') {
      setDict([
        {
          category: '종류별',
          options: ['전시', '공연', '뮤지컬', '레저', '기타'],
        },
        { category: '평점별', options: ['5점', '4점', '3점', '2점', '1점'] },
      ]);
    } else if (type === 'restaurants') {
      setDict([
        {
          category: '종류별',
          options: ['한식', '중식', '일식', '양식', '기타'],
        },
        { category: '평점별', options: ['5점', '4점', '3점', '2점', '1점'] },
      ]);
    }
  }, []);
  const filteringBoxes = dict.map((element) => {
    return (
      <FilteringBox
        key={element.category}
        category={element.category}
        options={element.options}
      />
    );
  });
  return <div className={styles.container}> {filteringBoxes}</div>;
}

export default SideFilteringBar;
