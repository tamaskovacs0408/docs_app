import React, {useState} from 'react';
import ModalComp from "./modalComp";

const Docs = ({db}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const handleOpen = () => setOpen(true);

  return (
    <div className='docs_main'>
      <h1>Docs</h1>

      <button className="add_doc_btn" onClick={handleOpen}>
        ADD DOCUMENT
      </button>
      <ModalComp open={open} setOpen={setOpen} title={title} setTitle={setTitle}/>
    </div>
  );
}

export default Docs;
