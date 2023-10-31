import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { commentCollection } from "../../../firebase/myFirebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DislikeCounter = (props) => {
  const { comment } = props;
  const [loading, setLoading] = useState(false);

  // setCommentLikeCount(commentData.like);
  // console.log(selectedComment);
  const handleDislikeComment = async () => {
    setLoading(true);
    await updateDoc(doc(commentCollection, comment.commentId), {
      ...comment,
      dislike: comment.dislike + 1,
      like: comment.like === 0 ? 0 : comment.like - 1,
    })
      .then((res) => {
        toast.error(`${comment.userName} clicked Dislike on your comment !!`, {
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
        onClick={handleDislikeComment}
        disabled={loading}
        style={{
          cursor: "pointer",
          width: "50px",
          height: "20px",
        }}
      >
        Dislike
      </button>
      <div style={{ width: "40px", border: "1px solid red" }}>
        {comment.dislike}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DislikeCounter;
