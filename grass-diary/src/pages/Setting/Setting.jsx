import styles from './styles';
import stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import API from '@services';
import useProfile from '@recoil/profile/useProfile';
import { profileAtom } from '@recoil/profile/profileState';
import { Header, Profile, Button } from '@components';

const SettingSection = ({ children, label }) => {
  return (
    <form {...stylex.props(styles.settingSection)}>
      <span>{label}</span>
      {children}
    </form>
  );
};

const Setting = () => {
  const { nickName, profileIntro } = useProfile();

  const [profile, setProfile] = useRecoilState(profileAtom);
  const [clickedNameSave, setClickedNameSave] = useState(false);
  const [clickedIntroSave, setClickedIntroSave] = useState(false);

  const handleChangeNickname = event => {
    setProfile({ ...profile, nickname: event.target.value });
  };

  const handleChangeProfileIntro = event => {
    setProfile({ ...profile, profileIntro: event.target.value });
  };

  const handleClick = setter => () => {
    setter(true);
  };

  useEffect(() => {
    if (clickedNameSave) {
      API.patch('/members/me', { nickname: profile.nickname })
        .then(() => {
          setClickedNameSave(false);
        })
        .catch(error => {
          console.error(`사용자 정보를 수정할 수 없습니다. ${error}`);
        });
    }
  }, [clickedNameSave, profile.nickname]);

  useEffect(() => {
    if (clickedIntroSave) {
      API.patch('/members/me', { profileIntro: profile.profileIntro })
        .then(() => {
          setClickedIntroSave(false);
        })
        .catch(error => {
          console.error(`사용자 정보를 수정할 수 없습니다. ${error}`);
        });
    }
  }, [clickedIntroSave, profile.profileIntro]);

  return (
    <div {...stylex.props(styles.container)}>
      <Header />
      <div {...stylex.props(styles.contentWrap)}>
        <div {...stylex.props(styles.titleSection)}>
          <span {...stylex.props(styles.title)}>설정</span>
        </div>
        <div {...stylex.props(styles.profileSection)}>
          <div {...stylex.props(styles.profileLeft)}>
            <Profile width="12.5rem" height="12.5rem" />
            <Button
              text="프로필 사진 변경"
              width="9.4rem"
              color="#000"
              backgroundColor="#FFF"
              border="2px solid #929292"
              marginTop="25px"
            />
          </div>
          <div {...stylex.props(styles.profileRight)}>
            <SettingSection label="닉네임">
              <input
                {...stylex.props(styles.textInput('0 0 0 1.25rem', '3.2rem'))}
                placeholder={nickName}
                onChange={handleChangeNickname}
              ></input>
              <Button
                text="저장"
                width="70px"
                color="#000"
                backgroundColor="#FFF"
                border="2px solid #929292"
                onClick={handleClick(setClickedNameSave)}
              />
            </SettingSection>
            <SettingSection label="소개글">
              <textarea
                {...stylex.props(styles.textInput('1rem 1.25rem', '6.25rem'))}
                placeholder={profileIntro}
                onChange={handleChangeProfileIntro}
              ></textarea>
              <Button
                text="저장"
                width="70px"
                height="51px"
                color="#000"
                backgroundColor="#FFF"
                border="2px solid #929292"
                onClick={handleClick(setClickedIntroSave)}
              />
            </SettingSection>
            <SettingSection label="잔디색">
              <div {...stylex.props(styles.colorWrapper)}>
                <div {...stylex.props(styles.grassColor)}></div>
              </div>
            </SettingSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
