import React, {useState} from 'react';
import ModalComp from "./modalComp";

const Docs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <div className='docs_main'>
      <h1>Docs</h1>

      <button className="add_doc_btn" onClick={handleOpen}>
        Add document
      </button>
      <ModalComp open={open} setOpen={setOpen}/>
    </div>
  );
}

export default Docs;
