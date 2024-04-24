import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { fetchPlan } from 'store/Slices/plans/thunks';
import { fetchActivities } from 'store/Slices/activities/thunks';
import EmptyHeart from 'assets/images/emptyheart.png';
import FullHeart from 'assets/images/fullheart.png';
import Modal from 'components/Modal/Modal';
import ModalContent from './ModalContent/ModalContent';
import styles from './LikeButton.module.css';

interface Props {
  contentId: number;
}

function LikeButton({ contentId }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state: RootState) => state.auth.isLogin);
  const [imgSrc, setImgSrc] = useState<string>(EmptyHeart);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const plans = useAppSelector((state: RootState) => state.plans.plans);

  useEffect(() => {
    if (isLogin) dispatch(fetchPlan());
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-syntax
    for (const plan of plans) {
      dispatch(fetchActivities({ id: plan.id }))
        .unwrap()
        .then((activities) => {
          if (
            activities.find(
              (activity) =>
                activity.referenceType === 'TOUR_API' &&
                activity.referenceId === contentId.toString(),
            )
          )
            setIsAdded(true);
        });
      if (isAdded) break;
    }
  }, []);

  useEffect(() => {
    if (isAdded) {
      setImgSrc(FullHeart);
    } else {
      setImgSrc(EmptyHeart);
    }
  }, [isAdded]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.btn} onClick={handleClick}>
        <img alt="add" src={imgSrc} />
      </button>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          Content={
            <ModalContent
              setParentModalOpen={setModalOpen}
              isAdded={isAdded}
              contentId={contentId}
            />
          }
          mywidth="500px"
          myheight="500px"
        />
      )}
    </div>
  );
}

export default LikeButton;
