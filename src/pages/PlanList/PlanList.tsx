import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import PlanCard from 'components/PlanCard/PlanCard';
import styles from './PlanList.module.css';

interface PlanObj {
  id: number;
  title: string;
  creator: string;
  members: string[];
}

function PlanList(): JSX.Element {
  useEffect(() => {
    // add fetch func later
  }, []);

  const planCards: PlanObj[] = [
    {
      id: 1,
      title: 'hihi',
      creator: 'me',
      members: ['a', 'b', 'c'],
    },
    {
      id: 2,
      title: 'hihi',
      creator: 'me',
      members: ['a', 'b', 'c'],
    },
    {
      id: 3,
      title: 'hihi',
      creator: 'me',
      members: ['a', 'b', 'c'],
    },
  ];

  return (
    <div className={styles.container}>
      <h1>PlanList</h1>
      <div className={styles.grid}>
        <div className={styles.make_plan}>
          <h3>새로운 계획을 만들어보세요!</h3>
        </div>
        {planCards.map((p: PlanObj) => (
          <Link to={`/plan-list/plans/${p.id}`} key={p.id}>
            <PlanCard
              key={p.title}
              title={p.title}
              creator={p.creator}
              members={p.members}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PlanList;
