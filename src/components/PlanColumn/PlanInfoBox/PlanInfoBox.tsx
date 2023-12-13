import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { getNicknameById } from 'store/Slices/users/thunks';
import { useState } from 'react';
import styles from './PlanInfoBox.module.css';

interface Props {
  title: string;
  writer: string;
}

function PlanInfoBox({ title, writer }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const planGroupId = useParams<{ planGroupId: string }>();
  const [writerNickname, setWriterNickname] = useState('');
  dispatch(getNicknameById({ id: writer }))
    .unwrap()
    .then((res) => setWriterNickname(res.nickname));

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>
        작성자: <b>{writerNickname}</b>
      </p>
      <Link to={`/calculate/${planGroupId}`}>
        <button type="button" className={styles.calculation_btn}>
          여행 정산하기
        </button>
      </Link>
    </div>
  );
}

export default PlanInfoBox;
