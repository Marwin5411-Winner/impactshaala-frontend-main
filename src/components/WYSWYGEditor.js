import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WYSWYGEditor = (props) => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={handleChange}
      {...props} // Spread all props dynamically
    />
  );
};

export default WYSWYGEditor;