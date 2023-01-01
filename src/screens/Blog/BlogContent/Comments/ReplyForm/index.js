import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CommentForm from "../CommentForm";
import PropTypes from "prop-types";

const ReplyForm = ({ open, handleClose, comment }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <CommentForm comment={comment} isReply={true} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReplyForm;

ReplyForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
};
