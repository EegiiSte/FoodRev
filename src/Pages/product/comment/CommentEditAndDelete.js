import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { commentCollection } from "../../../firebase/myFirebase";
import "./comment.css";

const CommentEditAndDelete = (props) => {
  const { comment, setSelectedComment, setOpenEditModal } = props;
  const handleDeleteComment = async (commentId) => {
    await deleteDoc(doc(commentCollection, commentId))
      .then((res) => {
        toast.success(" Your comment deleted successfull !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelOpenEditModal = (comment) => {
    setSelectedComment(comment);
    setOpenEditModal(true);
  };

  return (
    <div className="  editDeleteButtonBox d-flex align-c">
      <button
        className=" commentButton"
        onClick={(e) => {
          handelOpenEditModal(comment);
        }}
      >
        Edit
      </button>
      <button
        className=" commentButton"
        onClick={(e) => {
          handleDeleteComment(comment.commentId);
        }}
      >
        Delete
      </button>
    </div>
  );
};
export default CommentEditAndDelete;
