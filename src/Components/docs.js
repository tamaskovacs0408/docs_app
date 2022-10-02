import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ModalComp from "./modalComp";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Docs = ({ db }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [docsData, setDocsData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const collectionRef = collection(db, "docsData");
  const isMounted = useRef();
  let navigate = useNavigate();

  const addData = () => {
    addDoc(collectionRef, {
      title: title,
      typing: "",
    })
      .then(() => {
        toast.success("Document added!", {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        handleClose();
      })
      .catch(() => {
        toast.error("Document cannot be added!", {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  };
  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      setDocsData(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  const delData = async (id) => {
    const docRef = doc(db, "docsData", id);
    await deleteDoc(docRef);
  };
  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    isMounted.current = true;
    getData();
  }, []);
  const getID = (id) => {
    navigate(`/edit/${id}`);
  };
  return (
    <div className="docs_main">
      <ToastContainer />
      <h1>Docs</h1>

      <button className="add_doc_btn" onClick={handleOpen}>
        ADD DOCUMENT
      </button>
      <div className="grid_main">
        {docsData.map((doc) => {
          return (
            <div key={doc.id} className="grid_child">
              <button className="btn_open" onClick={() => getID(doc.id)}>
                {doc.title}
              </button>

              <FontAwesomeIcon
                className="btn_delete"
                onClick={() => delData(doc.id)}
                icon={faTrashAlt}
              />
            </div>
          );
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
