interface IProfile {
  profileImageURL?: string;
  nickName?: string;
  profileIntro?: string;
}

// Setting Page updateProfile Type
interface IUpdateProfile {
  nickname?: string;
  profileIntro?: string;
}

// Mood Profile Type
interface IMoodProfile {
  diary: IDiary[];
  index: number;
}
