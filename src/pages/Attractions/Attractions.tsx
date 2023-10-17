/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AttractionList from 'components/AttractionList/AttractionList';
import SideFilteringBar from 'components/SideFilteringBar/SideFilteringBar';
import { useEffect, useState } from 'react';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { useParams } from 'react-router-dom';
import styles from './Attractions.module.css';

import { Hotel, filterHotels } from '../../utils/filter';

function Attractions(): JSX.Element {
  const { data, isLoading } = useInfiniteScroll();
  const [result, setResult] = useState<Hotel[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const param = useParams<{ pagetype: string }>();

  const handleFilterChange = async (
    category: string,
    newSelectedFilters: string[],
  ) => {
    await setSelectedFilters({
      ...selectedFilters,
      [category]: newSelectedFilters,
    });
  };

  useEffect(() => {
    filterHotels(data, selectedFilters)
      .then((value) => {
        console.log('asd', value);
        setResult(value);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedFilters]);

  useEffect(() => {
    if (!isLoading) {
      setResult(data);
    }
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideFilteringBar
          type={param.pagetype!}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <div className={styles.list}>
        <AttractionList data={result} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Attractions;
