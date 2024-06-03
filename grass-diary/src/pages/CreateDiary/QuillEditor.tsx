import { useState, useEffect } from 'react';
import API from '@services/index';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type QuillEditorProps = {
  onContentChange: (content: string) => void;
  quillContent: string;
};

type QuestionResponse = {
  question: string;
};

const QuillEditor = ({ onContentChange, quillContent }: QuillEditorProps) => {
  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any,
  ) => {
    onContentChange(editor.getHTML());
  };

  const [todayQuestion, setTodayQuestion] = useState<string>();

  useEffect(() => {
    API.get<QuestionResponse>('/diary/today-question')
      .then(response => {
        setTodayQuestion(response.data.question);
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
      <h4>{todayQuestion ? todayQuestion : 'Loading...'}</h4>
      <br></br>
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
