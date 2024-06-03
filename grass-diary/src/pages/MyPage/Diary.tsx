import styles from './style';
import stylex from '@stylexjs/stylex';
import DOMPurify from 'dompurify';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import API from '@services/index';
import useUser from '@recoil/user/useUser';
import useDiary from '@hooks/useDiary';
import { NormalLike, MoodProfile } from '@components/index';

interface IPagination {
  pageSize: number;
  onPageChange: (index: number) => void;
}

const Pagination = ({ pageSize, onPageChange }: IPagination) => {
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

type TCreateMarpkup = (htmlContent: string | Node | undefined) => {
  __html: string;
};

const DiaryItem = ({ diary, diaryList, index }: IDiaryItem) => {
  const createMarkup: TCreateMarpkup = htmlContent => {
    const content = htmlContent || '';
    return { __html: DOMPurify.sanitize(content) };
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
            {diary.tags &&
              diary.tags.map(tag => (
                <span {...stylex.props(styles.hashtag)} key={tag.id}>
                  #{`${tag.tag} `}
                </span>
              ))}
          </div>
          <div dangerouslySetInnerHTML={createMarkup(diary.content)}></div>
        </div>
        <NormalLike
          likeCount={diary.likeCount || 0}
          justifyContent="flex-start"
        />
      </div>
    </Link>
  );
};

interface IDiaryProps {
  searchTerm: string;
  sortOrder: string;
  selectedDiary?: IDiary[];
  setSelectedDiary: any;
}

const Diary = ({
  setSelectedDiary,
  searchTerm,
  sortOrder,
  selectedDiary,
}: IDiaryProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hashtagId, setHashtagId] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState('');

  const { memberId } = useUser();
  const [currentPage, setCurrentPage] = useState(0);
  const { diaryList, pageSize } = useDiary({
    memberId,
    currentPage,
    sortOrder,
  });

  const filteredDiaryList =
    selectedDiary && selectedDiary.length > 0
      ? selectedDiary
      : diaryList.filter(diary => diary.content.includes(searchTerm));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewAllClick = () => {
    setIsSelected('all');
    navigate('/mypage');
  };

  useEffect(() => {
    const tagId = searchParams.get('tagId');
    tagId ? setHashtagId(tagId) : setHashtagId(null);
  }, [searchParams, navigate]);

  const handleTagClick = (tagId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tagId', tagId);
    navigate(`/mypage?${params.toString()}`);

    setIsSelected(tagId);
  };

  const { data: hashtagList } = useQuery({
    queryKey: ['hashtagList', memberId],
    queryFn: () =>
      API.get(`/search/hashTag/${memberId}`).then(({ data }) => data),
    enabled: !!memberId,
  });

  const { data: selectedTag } = useQuery<
    IDiary,
    Error,
    IDiary,
    (string | number | string | null)[]
  >({
    queryKey: ['selectedDiary', memberId, hashtagId],
    queryFn: () =>
      API.get(`search/tagId/${memberId}?tagId=${hashtagId}`).then(
        ({ data }) => data,
      ),
    enabled: !!hashtagId && !!memberId,
  });

  useEffect(() => {
    if (selectedTag) setSelectedDiary(selectedTag);
    if (!selectedTag) setSelectedDiary(undefined);
  }, [selectedTag]);

  return (
    <>
      <aside {...stylex.props(styles.hashtagListContainer)}>
        <div {...stylex.props(styles.hashtagListTitle)}>해시태그 목록</div>
        <ul {...stylex.props(styles.hashtagList)}>
          <a
            onClick={handleViewAllClick}
            {...stylex.props(
              isSelected === 'all' ? styles.selectedHashtag : styles.hashtag,
            )}
          >
            전체 보기 ({diaryList.length})
          </a>
          {hashtagList &&
            hashtagList.map((hashtag: { tagId: string; tag: string }) => (
              <li
                key={hashtag.tagId}
                onClick={() => handleTagClick(hashtag.tagId)}
              >
                <a
                  {...stylex.props(
                    isSelected === hashtag.tagId
                      ? styles.selectedHashtag
                      : styles.hashtag,
                  )}
                >
                  {hashtag.tag}
                </a>
              </li>
            ))}
        </ul>
      </aside>
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
