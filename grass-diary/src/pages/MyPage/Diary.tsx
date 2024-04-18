import styles from './style';
import stylex from '@stylexjs/stylex';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import useUser from '@recoil/user/useUser';
import useDiary from '@hooks/useDiary';
import { NormalLike, MoodProfile } from '@components/index';

const Pagination = ({ pageSize, onPageChange }) => {
  return (
    <div {...stylex.props(styles.pageButtonWrap)}>
      {Array.from({ length: pageSize }, (_, index) => (
        <button key={index} onClick={() => onPageChange(index)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

const DiaryItem = ({ diary, diaryList, index }) => {
  const createMarkup = htmlContent => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  return (
    <Link to={`/diary/${diary.diaryId}`}>
      <div {...stylex.props(styles.diary)}>
        <div {...stylex.props(styles.smallProfileSection)}>
          <MoodProfile diary={diaryList} index={index} />
          <div {...stylex.props(styles.smallDetailes)}>
            <span {...stylex.props(styles.name)}>{diary.createdDate}</span>
            <span {...stylex.props(styles.time)}>{diary.createdAt}</span>
          </div>
        </div>
        <div {...stylex.props(styles.diaryContent)}>
          <div>
            {diary.tags.map(tag => (
              <span {...stylex.props(styles.hashtag)} key={tag.id}>
                #{`${tag.tag} `}
              </span>
            ))}
          </div>
          <div dangerouslySetInnerHTML={createMarkup(diary.content)}></div>
        </div>
        <NormalLike likeCount={diary.likeCount} />
      </div>
    </Link>
  );
};

const Diary = ({ searchTerm, sortOrder, selectedDiary }) => {
  const { memberId } = useUser();
  const [currentPage, setCurrentPage] = useState(0);
  const { diaryList, pageSize } = useDiary({
    memberId,
    currentPage,
    sortOrder,
  });

  const filteredDiaryList =
    selectedDiary && selectedDiary.diaryId
      ? [selectedDiary]
      : diaryList.filter(diary => diary.content.includes(searchTerm));

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <>
      <div {...stylex.props(styles.diaryList)}>
        {filteredDiaryList.map((diary, index) => (
          <DiaryItem
            key={diary.diaryId}
            diary={diary}
            diaryList={filteredDiaryList}
            index={index}
          />
        ))}
      </div>
      <Pagination pageSize={pageSize} onPageChange={handlePageChange} />
    </>
  );
};

export default Diary;
