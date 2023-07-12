import { ReactElement } from 'react';
import styles from './Profile.module.css';

function Profile(): JSX.Element {
  const photoUrls = [
    {
      id: 0,
      url: 'https://img.icons8.com/material-sharp/48/000000/user-male-circle.png',
    },
    {
      id: 1,
      url: 'https://img.icons8.com/material-sharp/48/000000/user-male-circle.png',
    },
    {
      id: 2,
      url: 'https://img.icons8.com/material-sharp/48/000000/user-male-circle.png',
    },
    {
      id: 3,
      url: 'https://img.icons8.com/material-sharp/48/000000/user-male-circle.png',
    },
  ];
  const posts = photoUrls.length;
  const followers = 0;
  const following = 0;
  let photos: Array<ReactElement> = [];
  if (posts === 0)
    photos.push(<div className={styles.no_posts}> Not yet posted</div>);
  else {
    photos = photoUrls.map((photoUrl) => (
      <div key={photoUrl.id} className={styles.post_item}>
        <img src={photoUrl.url} alt="" />
      </div>
    ));
  }
  return (
    <div className={styles.container}>
      <div className={styles.user_header}>
        <img
          className={styles.profile_img}
          src="https://img.icons8.com/material-sharp/48/000000/user-male-circle.png"
          alt="profile img"
        />
        <div className={styles.user_info}>
          <div className={styles.user_info_top}>
            <div className={styles.user_name}>User Name</div>
            <button type="button" className={styles.profile_setting_btn}>
              <img
                className={styles.setting_img}
                src="https://img.icons8.com/ios-filled/50/settings.png"
                alt=""
              />
            </button>
          </div>
          <ul className={styles.profile_info_list}>
            <li className={styles.profile_info_item}>
              Posts: <b>{posts}</b>
            </li>
            <li className={styles.profile_info_item}>
              Followers: <b>{followers}</b>
            </li>
            <li className={styles.profile_info_item}>
              Following: <b>{following}</b>
            </li>
          </ul>
          <div className={styles.bio}> Here is bio </div>
        </div>
      </div>
      <div className={styles.line}> </div>
      <div className={styles.post_container}>
        <div className={styles.post_grid}> {photos} </div>
      </div>
      <nav className={styles.bottom_nav}>
        <ul className={styles.bottom_nav_list}>
          <li className={styles.bottom_nav_item}>
            <img
              src="https://img.icons8.com/material-rounded/48/000000/home.png"
              alt="home"
            />
          </li>
          <li className={styles.bottom_nav_item}>
            <img
              src="https://img.icons8.com/material-outlined/48/000000/plus--v1.png"
              alt="post"
            />
          </li>
          <li className={styles.bottom_nav_item}>
            <img
              src="https://img.icons8.com/material-sharp/48/000000/user-male-circle.png"
              alt="mypage"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Profile;
