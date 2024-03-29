import stylex from '@stylexjs/stylex';
import Header from '../../components/Header';
import Profile from '../../components/Profile';
import Button from '../../components/Button';
import styles from './styles';

const SettingSection = ({ children, label }) => {
  return (
    <div {...stylex.props(styles.settingSection)}>
      <span>{label}</span>
      {children}
    </div>
  );
};

const Setting = () => {
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
                placeholder="닉네임"
              ></input>
              <Button
                text="저장"
                width="70px"
                color="#000"
                backgroundColor="#FFF"
                border="2px solid #929292"
              />
            </SettingSection>
            <SettingSection label="소개글">
              <textarea
                {...stylex.props(styles.textInput('1rem 1.25rem', '6.25rem'))}
                placeholder="소개글을 입력해 주세요."
              ></textarea>
              <Button
                text="저장"
                width="70px"
                height="51px"
                color="#000"
                backgroundColor="#FFF"
                border="2px solid #929292"
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
