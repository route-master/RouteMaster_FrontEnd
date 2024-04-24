import { useDrop } from 'react-dnd';
import styles from './DragTargetLine.module.css';

interface Props {
  lineId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDropComponent: (item: any, lineId: number) => void;
}

function DragTargetLine({ lineId, onDropComponent }: Props): JSX.Element {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: 'activity',
      drop: (item) => {
        onDropComponent(item, lineId);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [],
  );

  const containerStyle = { backgroundColor: isOver ? 'lightblue' : 'white' };

  return (
    <div ref={dropRef} className={styles.container} style={containerStyle}>
      <p className={styles.lineNum}> {lineId} </p>
      <div key={lineId} className={styles.line}>
        {}
      </div>
    </div>
  );
}

export default DragTargetLine;
