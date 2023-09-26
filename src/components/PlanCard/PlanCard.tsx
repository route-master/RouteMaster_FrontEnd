import defaultImg from 'assets/images/logo_black.png';
import styles from './PlanCard.module.css';

interface Props {
  title: string;
  writer: string;
  participants: string[];
  imgsrc: string;
}

function PlanCard({ title, writer, participants, imgsrc }: Props): JSX.Element {
  const imgUrl = imgsrc === '' ? defaultImg : imgsrc;
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${imgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className={styles.container} style={backgroundStyle}>
      <div className={styles.contents_wrapper}>
        <h3>{title}</h3>
        <p>
          작성자:
          <b>{writer}</b>
        </p>
        <p>
          참여자:
          {participants.map((m, i) => {
            return i !== participants.length - 1 ? m.concat(', ') : m;
          })}
        </p>
      </div>
    </div>
  );
}

export default PlanCard;
