/* eslint-disable no-alert */
import { useLocation, useParams } from 'react-router-dom';
import LikeButton from 'components/LikeButton/PlanLikeButton/LikeButton';
import styles from './DetailHeader.module.css';

interface Props {
  title: string;
}

function DetailHeader({ title }: Props): JSX.Element {
  const URL = useLocation().pathname;
  const { id } = useParams<{ id: string }>();

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(`http://www.route-master.org${URL}`);
      alert('클립보드에 복사되었습니다.');
    } catch (err) {
      alert(`복사에 실패했습니다. ${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.btn_group}>
        <div className={styles.likebtn}>
          <LikeButton contentId={parseInt(id ?? '0', 10)} />
        </div>
        <div className={styles.sharebtn_wrapper}>
          <button
            type="button"
            className={styles.sharebtn}
            onClick={handleClick}
          >
            공유 하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailHeader;
