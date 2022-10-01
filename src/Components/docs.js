import React, { useState, useEffect } from "react";
import ModalComp from "./modalComp";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const Docs = ({ db }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const collectionRef = collection(db, 'docsData')
  const addData = () => {
    addDoc(collectionRef, {
        title: title
    })
    .then(() => {
        alert('Data added!')
        handleClose()
    })
    .catch(() => {
        alert('Data cannot be added!')
    })
  }
  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      console.log(data.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
      }))
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="docs_main">
      <h1>Docs</h1>

      <button className="add_doc_btn" onClick={handleOpen}>
        ADD DOCUMENT
      </button>
      <ModalComp
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        handleClose={handleClose}
        addData={addData}
      />
    </div>
  );
};

export default Docs;
