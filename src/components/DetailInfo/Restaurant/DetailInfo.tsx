/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import KakaoMaps from '../KakaoMaps/KakaoMaps';
import styles from './DetailInfo.module.css';

interface Props {
  infoCenter: string;
  parking: string;
  restDate: null | string;
  mapX: number;
  mapY: number;
}

function RestaurantDetailInfo(props: Props): JSX.Element {
  const { infoCenter, parking, restDate, mapX, mapY } = props;
  const [map, setMap] = useState();

  return (
    <div className={styles.container}>
      <h1>상세 정보</h1>
      <div className={styles.wrapper}>
        <div className={styles.detail}>
          <div>
            문의: <span>{infoCenter}</span>
          </div>
          <div>
            주차: <span>{parking === '' ? parking : '불가'}</span>
          </div>
          <div>
            휴무: <span>{restDate?.replace('<br>', '/') || '연중무휴'}</span>
          </div>
        </div>
        <div className={styles.map}>
          <KakaoMaps
            setMap={setMap}
            mapX={mapX}
            mapY={mapY}
            mywidth="calc(100%-2px)"
            myheight="200px"
          />
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailInfo;
