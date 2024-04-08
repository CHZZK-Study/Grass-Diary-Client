import { useState, useEffect } from 'react';
import API from '@services';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ onContentChange, quillContent }) => {
  const handleChange = editor => {
    onContentChange(editor.getHTML());
  };

  const [todayQuestion, setTodayQuestion] = useState();

  useEffect(() => {
    API.get('/main/todayInfo')
      .then(response => {
        setTodayQuestion(response.data.todayQuestion);
      })
      .catch(error => {
        console.error(`오늘의 질문을 불러올 수 없습니다. ${error}`);
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
      <ReactQuill
        theme="snow"
        placeholder={todayQuestion ? todayQuestion : '일기를 작성 해보세요!'}
        modules={modules}
        formats={formats}
        onChange={handleChange}
        value={quillContent}
        style={{ height: '70vh' }}
      />
    </>
  );
};

export default QuillEditor;
