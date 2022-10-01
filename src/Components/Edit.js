import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateDoc, collection, doc, onSnapshot } from "firebase/firestore";

export default function Edit({ db }) {
  const [typing, setTyping] = useState("");
  const [title, setTitle] = useState("");
  const isMounted = useRef();
  const collectionRef = collection(db, "docsData");
  let params = useParams();
  const getQuillData = (value) => {
    setTyping(value);
  };
  useEffect(() => {
    const updateDocument = setTimeout(() => {
      const document = doc(collectionRef, params.id);
      updateDoc(document, {
        typing: typing,
      })
        .then(() => {
          // alert("Document saved!");
        })
        .catch(() => {
          alert("Document cannot be saved!");
        });
    }, 1000);
    return () => clearTimeout(updateDocument);
  }, [typing]);

  const getData = () => {
    const document = doc(collectionRef, params.id);
    onSnapshot(document, (docs) => {
      setTitle(docs.data().title);
      setTyping(docs.data().typing);
    });
  };

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;
    getData();
  }, []);

  return (
    <div className="edit_container">
      <h1>{title}</h1>
      <div className="edit_inner">
        <ReactQuill className="quill" value={typing} onChange={getQuillData} />
      </div>
    </div>
  );
}
