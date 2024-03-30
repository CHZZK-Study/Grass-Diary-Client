import { useState, useEffect } from 'react';
import API from '../services';

const useDiary = (memberId, currentPage, sortOrder) => {
  const [diaryList, setDiaryList] = useState([]);
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    let apiUrl = `/diary/main/${memberId}?page=${currentPage}`;
    if (sortOrder === 'oldest') {
      apiUrl += `&sort=createdAt,ASC`;
    }

    if (memberId) {
      API.get(apiUrl)
        .then(response => {
          setPageSize(response.data.totalPages);
          setDiaryList(response.data.content);
        })
        .catch(error => {
          console.log(`사용자의 일기를 조회할 수 없습니다. ${error}`);
        });
    }
  }, [memberId, sortOrder, currentPage]);

  return { diaryList, pageSize };
};

export default useDiary;
