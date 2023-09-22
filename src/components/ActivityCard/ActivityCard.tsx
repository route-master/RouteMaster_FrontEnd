import DragImg from 'assets/images/drag.png';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { useEffect, useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './ActivityCard.module.css';

interface Activity {
  id?: number;
  planGroupId: number;
  name: string;
  description?: string;
  beginDate: number;
  endDate: number;
  type: string;
  planMapInfo?: object;
  thumbnailImageUrl: string;
  planPaymentLog?: object[];
}

interface Props {
  activity: Activity;
}

function ActivityCard({ activity }: Props): JSX.Element {
  const { name, type, thumbnailImageUrl } = activity;
  let borderColor: string;

  if (type === 'hotel') {
    borderColor = 'red';
  } else if (type === 'attraction') {
    borderColor = 'blue';
  } else {
    borderColor = 'purple';
  }

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'activity',
      item: { ...activity },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  );

  const containerStyle = {
    opacity: isDragging ? 0.5 : 1,
    border: `1px solid ${borderColor}`,
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div ref={dragRef} className={styles.container} style={containerStyle}>
      <img src={thumbnailImageUrl} alt="" className={styles.thumb} />
      <h3>{name}</h3>
      <div className={styles.rightside_wrapper}>
        <button className={styles.payment} type="button">
          정산하기
        </button>
        <DragIndicatorIcon fontSize="large" cursor="pointer" />
      </div>
    </div>
  );
}

export default ActivityCard;
