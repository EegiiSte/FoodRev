import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { replyCollection } from "../../../../firebase/myFirebase";
import "../comment.css";

const CommentReplyEditAndDelete = (props) => {
  const { replyComment, setSelectedReplyComment, setOpenEditReplyModal } =
    props;
  const handleDeleteComment = async (replyCommentId) => {
    await deleteDoc(doc(replyCollection, replyCommentId))
      .then((res) => {
        toast.success(" Your comment deleted successfull !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelOpenEditReplyModal = () => {
    setSelectedReplyComment(replyComment);
    setOpenEditReplyModal(true);
  };

  return (
    <div className="  editDeleteButtonBox d-flex align-c">
      <button
        className=" commentButton"
        onClick={(e) => {
          handelOpenEditReplyModal(replyComment);
        }}
      >
        Edit
      </button>
      <button
        className=" commentButton"
        onClick={(e) => {
          handleDeleteComment(replyComment.replyCommentId);
        }}
      >
        Delete
      </button>
    </div>
  );
};
export default CommentReplyEditAndDelete;
