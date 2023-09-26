import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AddPlanCard from 'components/AddPlanCard/AddPlanCard';
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
  ];

  return (
    <div className={styles.container}>
      <h1>PlanList</h1>
      <div className={styles.grid}>
        <div className={styles.make_plan}>
          <AddPlanCard />
        </div>
        {planCards.map((p: PlanObj) => (
          <Link to={`/plan-list/plan/${p.id}`} key={p.id}>
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
