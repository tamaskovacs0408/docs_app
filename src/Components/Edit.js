import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Edit({db}) {
  const [typing, setTyping] = useState('');
  let params = useParams();
  const getQuillData = (value) => {
    setTyping(value)
  }

  return (
    <div>
      <h1>Edit</h1>
      <ReactQuill value={typing} onChange={getQuillData}/>
    </div>
  )
}
