/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import KakaoMaps from '../KakaoMaps/KakaoMaps';
import styles from './DetailInfo.module.css';

interface Props {
  accomodationCount: string;
  checkInTime: string;
  checkOutTime: string;
  roomCount: string;
  reservationUrl: string;
  tel: string;
  mapX: string;
  mapY: string;
}

function HotelDetailInfo(props: Props): JSX.Element {
  const {
    accomodationCount,
    checkInTime,
    checkOutTime,
    roomCount,
    reservationUrl,
    tel,
    mapX,
    mapY,
  } = props;
  const [href, setHref] = useState('');
  const [title, setTitle] = useState('');
  const [map, setMap] = useState<any>(null);

  // URL extraction
  useEffect(() => {
    if (reservationUrl) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(reservationUrl, 'text/html');
      const anchorElement = doc.querySelector('a');

      if (anchorElement) {
        setHref(anchorElement.getAttribute('href') || '');
        setTitle(anchorElement.getAttribute('title') || '');
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1>상세정보</h1>
      <div className={styles.wrapper}>
        <div className={styles.detail}>
          <div>
            체크인: <span>{checkInTime}</span>
          </div>
          <div>
            체크아웃: <span>{checkOutTime}</span>
          </div>
          <div>
            객실수: <span>{roomCount}</span>
          </div>
          {accomodationCount && (
            <div>
              수용인원: <span>{accomodationCount}</span>
            </div>
          )}
          <div>
            전화번호: <span>{tel}</span>
          </div>
          {reservationUrl && (
            <div>
              <a href={href} title={title} className={styles.link}>
                예약 링크 바로가기
              </a>
            </div>
          )}
        </div>
        <div className={styles.map}>
          <KakaoMaps
            setMap={setMap}
            mapX={parseFloat(mapX)}
            mapY={parseFloat(mapY)}
            mywidth="calc(100%-2px)"
            myheight="200px"
          />
        </div>
      </div>
    </div>
  );
}

export default HotelDetailInfo;
