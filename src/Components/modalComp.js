import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalComp = ({ open, setOpen, title, setTitle, addData, handleClose }) => {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            placeholder="Add tilte"
            className="add_input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <div className="btn_container">
            <button className="add_doc_btn" onClick={addData}>ADD</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComp;
