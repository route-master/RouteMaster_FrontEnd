import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import MapColumn from '../../components/MapColumn/MapColumn';
import PlanColumn from '../../components/PlanColumn/PlanColumn';
import styles from './Plan.module.css';

function Plans(): JSX.Element {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.body}>
        <PlanColumn />
        <MapColumn />
      </div>
    </DndProvider>
  );
}

export default Plans;
