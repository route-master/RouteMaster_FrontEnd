import { useEffect, useState } from 'react';
import styles from './DetailInfo.module.css';

interface Props {
  accomodationCount: string;
  checkInTime: string;
  checkOutTime: string;
  roomCount: string;
  reservationUrl: string;
  tel: string;
}

function HotelDetailInfo(props: Props): JSX.Element {
  const {
    accomodationCount,
    checkInTime,
    checkOutTime,
    roomCount,
    reservationUrl,
    tel,
  } = props;
  const [href, setHref] = useState('');
  const [title, setTitle] = useState('');

  // URL extraction
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(reservationUrl, 'text/html');
    const anchorElement = doc.querySelector('a');

    if (anchorElement) {
      setHref(anchorElement.getAttribute('href') || '');
      setTitle(anchorElement.getAttribute('title') || '');
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1>상세정보</h1>
      <div className={styles.detail}>
        <div>
          체크인: <span> {checkInTime} </span>
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
        <div>
          <a href={href} title={title} className={styles.link}>
            예약 링크 바로가기
          </a>
        </div>
      </div>
    </div>
  );
}

export default HotelDetailInfo;
