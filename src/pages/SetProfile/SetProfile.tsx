/* eslint-disable no-alert */
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  getMyProfile,
  setProfile,
  updatePassword,
} from 'store/Slices/users/thunks';
import styles from './SetProfile.module.css';

function SetProfile(): JSX.Element {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const currentPWd = useRef<HTMLInputElement>(null);
  const newPwd = useRef<HTMLInputElement>(null);
  const confirmNewPwd = useRef<HTMLInputElement>(null);
  const [birthDate, setBirthDate] = useState('');
  const dispatch = useAppDispatch();

  const profilesState = useAppSelector(
    (state) => state.profile.profiles[0]?.profile,
  );
  const error = useAppSelector((state) => state.profile.error);

  // get profile
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  const handleSetProfile = () => {
    if (!nicknameRef.current) {
      alert('닉네임을 입력해주세요!');
      return;
    }
    if (
      currentPWd.current?.value ||
      newPwd.current?.value ||
      confirmNewPwd.current?.value
    ) {
      if (!currentPWd.current?.value) {
        alert('현재 비밀번호를 입력해주세요!');
        return;
      }
      if (!newPwd.current?.value) {
        alert('새 비밀번호를 입력해주세요!');
        return;
      }
      if (!confirmNewPwd.current?.value) {
        alert('새 비밀번호 확인을 입력해주세요!');
        return;
      }
      if (newPwd.current?.value !== confirmNewPwd.current?.value) {
        alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다!');
        return;
      }
      dispatch(updatePassword({ password: newPwd.current?.value }));
    }

    dispatch(
      setProfile({
        profile: {
          nickname: nicknameRef.current?.value,
          birthDate,
          profileImageUrl: '',
          accessType: 'ALL',
        },
        access: {
          birthDate: true,
          profileImageUrl: false,
        },
      }),
    );
    if (error) {
      alert('프로필 설정 실패\n잠시후 다시 시도해주세요!!');
    } else {
      alert('프로필 설정 성공!!');
    }
  };

  return (
    <div className={styles.container}>
      <h1>프로필 설정</h1>
      <form className={styles.profile_form}>
        <div>
          <label htmlFor="nickName">이름을 입력해주세요!</label>
          <input
            type="text"
            name="nickName"
            id="nickName"
            defaultValue={profilesState?.nickname}
            ref={nicknameRef}
          />
        </div>
        <div>
          <label htmlFor="birthDate">생일을 입력해주세요!</label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            defaultValue={profilesState?.birthDate?.split('T')[0]}
            onChange={(e) => {
              setBirthDate(new Date(e.target.value).toISOString());
            }}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호 변경</label>
          <div className={styles.pwd_input_container}>
            <div>
              <input
                type="password"
                name="current_password"
                id="current_password"
                ref={currentPWd}
              />
              <label htmlFor="current_password">현재 비밀번호</label>
            </div>
            <div>
              <input
                type="password"
                name="new_password"
                id="new_password"
                ref={newPwd}
              />
              <label htmlFor="new_password">새 비밀번호</label>
            </div>
            <div>
              <input
                type="password"
                name="confirm_new_password"
                id="confirm_new_password"
                ref={confirmNewPwd}
              />
              <label htmlFor="confirm_new_password">새 비밀번호 확인</label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={styles.submit_btn}
          onClick={handleSetProfile}
        >
          저장
        </button>
      </form>
    </div>
  );
}

export default SetProfile;
