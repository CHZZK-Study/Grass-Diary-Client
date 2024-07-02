interface ITages {
  id: number;
  tag: string;
  tagUsageCount: number;
}

interface IDiary {
  content: string;
  createdAt: string;
  createdDate: string;
  diaryId: number;
  isPrivate: boolean;
  likeCount: number;
  likedByLogInMember: boolean;
  tags: ITages[];
  transparency: number;
}

// DiaryItem Component Type
interface IDiaryItem {
  diary: IDiary;
  diaryList: IDiary[];
  index: number;
}

type TCreateMarpkup = (htmlContent: string | Node | undefined) => {
  __html: string;
};

// Diary Response Type
interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface IPageble {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: ISort;
  unpaged: boolean;
}

interface IDiaryResponse {
  content: IDiary[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: IPageble;
  size: number;
  sort: ISort;
  totalElements: number;
  totalPages: number;
}

interface IPopularDiaryResponse {
  createdAt: string;
  diaryContent: string;
  diaryId: number;
  diaryLikeCount: number;
  memberId: number;
  nickname: string;
}

interface ILatestDiaryResponse {
  pageParams: number[];
  pages: ILatestDiary[][];
}

interface ILatestDiary {
  content: string;
  createdAt: string;
  diaryId: number;
  diaryLikeCount: number;
  memberId: number;
  nickname: string;
}

interface IDiaryDetail extends IDiary {
  hasImage: null;
  hasTag: null;
  id: number;
  memberId: number;
  imageURL: string;
}
