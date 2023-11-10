import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { fetchPlan } from 'store/Slices/plans/thunks';
import { selectPlanById } from 'store/Slices/plans/slice';
import { getUserProfileList } from 'store/Slices/users/thunks';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import styles from './CustomAvatarGroup.module.css';

interface profile {
  id: string;
  baseUserId: string;
  nickname: string;
  birthDate: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  accessType: string;
}

function CustomGroupAvatars() {
  const { planGroupId } = useParams<{ planGroupId: string }>();
  const dispatch = useAppDispatch();
  const [participantsInfo, setParticipantsInfo] = useState<profile[]>([]);

  useEffect(() => {
    if (planGroupId) dispatch(fetchPlan());
  }, [dispatch, planGroupId]);

  const fetchedPlan = useAppSelector((state: RootState) =>
    planGroupId ? selectPlanById(state, planGroupId) : null,
  );

  useEffect(() => {
    const participants = fetchedPlan?.participants;
    if (participants && participants.length > 0) {
      dispatch(getUserProfileList({ ids: participants }));
    }
  }, [dispatch, fetchedPlan?.participants]);

  const profiles = useAppSelector((state: RootState) => state.profile.profiles);

  useEffect(() => {
    if (profiles.length > 0) {
      setParticipantsInfo(profiles.flatMap((profile) => profile.profile));
    }
  }, [profiles]);

  return (
    <div className={styles.container}>
      <AvatarGroup max={4}>
        {participantsInfo &&
          participantsInfo.map((item) => (
            <Tooltip title={item.nickname} key={item.id}>
              <Avatar alt={item.nickname} src={item.profileImageUrl} />
            </Tooltip>
          ))}
      </AvatarGroup>
    </div>
  );
}

export default CustomGroupAvatars;
