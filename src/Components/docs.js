import React, { useState } from "react";
import ModalComp from "./modalComp";
import { addDoc, collection } from "firebase/firestore";

const Docs = ({ db }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const handleOpen = () => setOpen(true);
  const collectionRef = (db, "docsData");
  const addData = () => {
    addDoc(collectionRef, { title: title })
      .then(() => {
        alert("Data added!");
      })
      .catch(() => {
        alert("Data cannot be added!");
      });
  };

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
        addData={addData}
      />
    </div>
  );
};

export default Docs;
