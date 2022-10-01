import React from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Edit({db}) {
  let params = useParams();

  return (
    <div>
      <h1>Edit</h1>
      <ReactQuill />
    </div>
  )
}
