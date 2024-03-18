import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = () => {
  const [values, setValues] = useState();
  const [todayQuestion, setTodayQuestion] = useState();

  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/main/todayInfo', config)
      .then(response => {
        setTodayQuestion(response.data.todayQuestion);
      })
      .catch(error => {
        console.log('오늘의 질문 에러', error);
      });
  }, []);

  const toolbarOptions = [
    ['image'],
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'image',
    'width',
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <>
      <h3>{todayQuestion ? todayQuestion : 'Loading...'}</h3>
      <main>
        <ReactQuill
          style={{ height: '75vh', background: 'white' }}
          theme="snow"
          placeholder={todayQuestion ? todayQuestion : 'Loading...'}
          modules={modules}
          formats={formats}
          onChange={setValues}
        />
      </main>
    </>
  );
};

export default QuillEditor;
