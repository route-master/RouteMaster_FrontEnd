import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import { setProfile } from 'store/Slices/users/thunks';
import { toast } from 'react-toastify';
import styles from './SetProfile.module.css';

function SetProfile(): JSX.Element {
  const [nickName, setNickName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const profiles = useAppSelector((state) => state.profile.profiles);
  const isLoading = useAppSelector((state) => state.profile.isLoading);
  const error = useAppSelector((state) => state.profile.error);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const reqSetProfile = () => {
    dispatch(
      setProfile({
        profile: {
          nickname: nickName,
          birthDate,
          profileImageUrl: '',
          accessType: 'ALL',
        },
        access: {
          birthDate: true,
          profileImageUrl: true,
          phoneNumber: false,
        },
      }),
    );
  };

  useEffect(() => {
    if (!isLoading) {
      if (profiles) {
        navigate('/check_profile');
      } else {
        toast.error('프로필 설정 실패\n잠시후 다시 시도해주세요!!');
      }
    }
  }, [profiles, error]);

  return (
    <div className={styles.container}>
      <div className={styles.profile_form}>
        <label htmlFor="nickName">이름을 입력해주세요!</label>
        <input
          type="text"
          name="nickName"
          id="nickName"
          onChange={({ target: { value } }) => {
            setNickName(value);
          }}
        />
        <label htmlFor="birthDate">생일을 입력해주세요!</label>
        <input
          type="datetime-local"
          name="birthDate"
          id="birthDate"
          onChange={({ target: { value } }) => {
            setBirthDate(value.toString());
          }}
        />
        <button type="submit" onClick={reqSetProfile}>
          submit
        </button>
      </div>
    </div>
  );
}

export default SetProfile;
