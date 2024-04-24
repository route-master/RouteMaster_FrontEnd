import { useAppDispatch } from 'store/hooks';
import { getNickNamesById } from 'store/Slices/users/thunks';
import { useEffect, useState } from 'react';
import defaultImg from 'assets/images/logo_black.png';
import styles from './PlanCard.module.css';

interface Props {
  title: string;
  writer: string;
  participants: string[];
  imgsrc: string;
}

function PlanCard({ title, writer, participants, imgsrc }: Props): JSX.Element {
  const [writerNickname, setWriterNickname] = useState<string>('');
  const [nicknames, setNicknames] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const imgUrl = imgsrc === '' ? defaultImg : imgsrc;
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${imgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  useEffect(() => {
    dispatch(getNickNamesById({ ids: [writer] }))
      .unwrap()
      .then((res) => {
        setWriterNickname(res.nicknames[0].nickname);
      });
  }, [writer]);

  useEffect(() => {
    dispatch(getNickNamesById({ ids: participants }))
      .unwrap()
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setNicknames(res.nicknames.map((r: any) => r.nickname));
      });
  }, [dispatch, participants]);

  return (
    <div className={styles.container} style={backgroundStyle}>
      <div className={styles.contents_wrapper}>
        <h3>{title}</h3>
        <p>
          작성자:
          <b>{writerNickname}</b>
        </p>
        <p>
          참여자:
          {nicknames.map((m, i) => {
            return i !== nicknames.length - 1 ? m.concat(', ') : m;
          })}
        </p>
      </div>
    </div>
  );
}

export default PlanCard;
