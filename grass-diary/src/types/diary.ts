interface ITages {
  id?: number;
  tag?: string;
  tagUsageCount?: number;
}

interface IDiary extends ITages {
  content?: string;
  createdAt?: string;
  createdDate?: string;
  diaryId?: number;
  isPrivate?: boolean;
  likeCount?: number;
  tags?: ITages[];
  transparency?: number;
}

// DiaryItem Component Type
interface IDiaryItem extends IDiary {
  diary: IDiary;
  diaryList: IDiary[];
  index: number;
}

type TCreateMarpkup = (htmlContent: string | Node | undefined) => {
  __html: string;
};
