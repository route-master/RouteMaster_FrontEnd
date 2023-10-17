import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetProfiles } from 'store/Slices/users/profileSlice';
import { logoutS } from 'store/Slices/users/slice';
import { logout } from 'store/Slices/users/thunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';

function Logout(): JSX.Element {
  const dispatch = useAppDispatch();
  const profilesState = useAppSelector((state) => state.profile.profiles[0]);
  const navigate = useNavigate();

  dispatch(logout());
  dispatch(logoutS());
  dispatch(resetProfiles());
  localStorage.setItem('accessToken', '');

  useEffect(() => {
    if (!profilesState  ) {
      navigate('/');
    }
  });

  return <>logged out</>;
}

export default Logout;
