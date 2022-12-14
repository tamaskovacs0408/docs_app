import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function Edit({ db }) {
  const [typing, setTyping] = useState("");
  const [title, setTitle] = useState("");
  const isMounted = useRef();
  const collectionRef = collection(db, "docsData");
  let params = useParams();
  const quillModule = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

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
          toast.success("Document saved!", {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        })
        .catch(() => {
          toast.error("Document cannot be saved!", {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
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
      <ToastContainer />
      <h1 className="edit_title">{title}</h1>
      <NavLink className="link_back" to="/">
        <FontAwesomeIcon className='back_icon' icon={faArrowAltCircleLeft}/>
        Back to docs
      </NavLink>
      <div className="edit_inner">
        <ReactQuill className="quill" theme='snow' modules={quillModule} value={typing} onChange={getQuillData} />
      </div>
    </div>
  );
}
