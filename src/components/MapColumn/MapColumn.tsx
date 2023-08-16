import { useRef, useState } from 'react';

import KakaoMaps from '../KakaoMaps/KakaoMaps';
import MapColumnLevelController from './LevelController/LevelController';
import MapColumnSearchBar from './SearchBar/SearchBar';
import styles from './MapColumn.module.css';

function MapColumn(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState('');
  const searchBarRefs = {
    inputRef: useRef<HTMLInputElement>(null),
    placeListRef: useRef<HTMLUListElement>(null),
    paginationRef: useRef<HTMLDivElement>(null),
  };

  const zoomIn = () => {
    if (map) map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    if (map) map.setLevel(map.getLevel() + 1);
  };

  return (
    <div className={styles.body}>
      <KakaoMaps map={map} setMap={setMap} keyword={keyword} />
      <div id="hi" className={styles.searchbar}>
        <MapColumnSearchBar {...searchBarRefs} setKeyword={setKeyword} />
      </div>
      <MapColumnLevelController zoomIn={zoomIn} zoomOut={zoomOut} />
    </div>
  );
}

export default MapColumn;
