import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {updateDoc, collection, doc, onSnapshot} from 'firebase/firestore';

export default function Edit({db}) {
  const [typing, setTyping] = useState('');
  const collectionRef = collection(db, 'docsData')
  let params = useParams();
  const getQuillData = (value) => {
    setTyping(value)
  }
  useEffect(() => {
    const updateDocument = setTimeout(() => {

    }, 1000)
    return () => clearTimeout(updateDocument);
  }, [])

  return (
    <div>
      <h1>Edit</h1>
      <ReactQuill value={typing} onChange={getQuillData}/>
    </div>
  )
}
