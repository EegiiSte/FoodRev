import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { commentCollection } from "../../../firebase/myFirebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LikeCounter = (props) => {
  const { comment } = props;
  const [loading, setLoading] = useState(false);

  // console.log(comment);
  const handleLikeComment = async () => {
    setLoading(true);
    await updateDoc(doc(commentCollection, comment.commentId), {
      ...comment,
      like: comment.like + 1,
      dislike: comment.dislike === 0 ? 0 : comment.dislike - 1,
    })
      .then((res) => {
        toast.success(`${comment.userName} clicked like on your comment !`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <button
        onClick={handleLikeComment}
        disabled={loading}
        style={{
          cursor: "pointer",
          width: "50px",
          height: "20px",
        }}
      >
        Like
      </button>
      <div type="number" style={{ width: "40px", border: "1px solid red" }}>
        {}
        {comment.like}
      </div>
      <ToastContainer />
    </div>
  );
};
export default LikeCounter;
