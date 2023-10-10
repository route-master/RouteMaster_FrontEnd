import { useState, useEffect } from 'react';
import styles from './DetailInfo.module.css';

interface Props {
  address: string;
  tel: null | string;
  homepage: null | string;
  overview: string;
  bookTour: boolean;
}

interface Link {
  href: string;
  title: string;
  text: string;
}

function EventDetailInfo(props: Props): JSX.Element {
  const { address, tel, homepage, overview, bookTour } = props;
  const [links, setLinks] = useState<Link[]>();

  useEffect(() => {
    if (homepage) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(homepage, 'text/html');
      const aTags = doc.querySelectorAll('a');
      const extractedLinks = Array.from(aTags).map((a) => ({
        href: a.getAttribute('href') || '',
        title: a.getAttribute('title') || '',
        text: a.textContent || '',
      }));
      setLinks(extractedLinks);
    }
  }, [homepage]);

  return (
    <div className={styles.container}>
      <h1>상세정보</h1>
      <div className={styles.wrapper}>
        <div className={styles.detail}>
          <div className={styles.overview}>
            {overview?.replaceAll('<br>', '').replaceAll('.', '.\n\n')}
          </div>
          <div className={styles.details}>
            <h2 className={styles.subheader}>기타</h2>
            <div>
              문의: <span>{tel}</span>
            </div>
            <div>
              주소: <span>{address}</span>
            </div>
            <div>
              예약: <span>{bookTour ? '가능' : '불가능'}</span>
            </div>
          </div>
          <div>
            <h2>관련 링크</h2>
            {links &&
              links.map((link) => {
                return (
                  <div key={link.href}>
                    <a
                      href={link.href}
                      title={link.title}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles.map}> {} </div>
      </div>
    </div>
  );
}

export default EventDetailInfo;
