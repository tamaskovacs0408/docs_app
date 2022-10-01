import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ModalComp from "./modalComp";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const Docs = ({ db }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [docsData, setDocsData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const collectionRef = collection(db, 'docsData')
  const isMounted = useRef();
  let navigate = useNavigate();

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
      setDocsData(data.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
      }))
    })
  }

  useEffect(() => {
    if(isMounted.current) {
      return;
    }

    isMounted.current = true;
    getData();
  }, [])
  const getID = (id) => {
    navigate(`/edit/${id}`)
  }
  return (
    <div className="docs_main">
      <h1>Docs</h1>

      <button className="add_doc_btn" onClick={handleOpen}>
        ADD DOCUMENT
      </button>
      <div className="grid_main">
        {docsData.map((doc) => {
          return (
            <div key={doc.id} className="grid_child" onClick={() => getID(doc.id)}>
              <p>{doc.title}</p>
              <div dangerouslySetInnerHTML={{__html: doc.typing}}></div>
            </div>
          )
        })}
      </div>
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
