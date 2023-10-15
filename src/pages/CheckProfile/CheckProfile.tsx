import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeBaseHeader, getMyProfile } from 'store/Slices/users/thunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';

function CheckProfile(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profiles = useAppSelector((state) => state.profile.profiles);
  const isLoading = useAppSelector((state) => state.profile.isLoading);
  const error = useAppSelector((state) => state.profile.error);

  useEffect(() => {
    changeBaseHeader();
    dispatch(getMyProfile());
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (profiles) {
        navigate('/');
      } else {
        navigate('/set_profile');
      }
    }
  }, [profiles, error]);

  return <div>loading...</div>;
}

export default CheckProfile;
