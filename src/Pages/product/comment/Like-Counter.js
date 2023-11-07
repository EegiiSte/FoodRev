import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LikeCounter = (props) => {
  const { comment, collection, id, user } = props;
  const [loading, setLoading] = useState(false);

  const handleLikeComment = async () => {
    setLoading(true);
    await updateDoc(doc(collection, id), {
      ...comment,
      like: comment.like + 1,
      dislike: comment.dislike === 0 ? 0 : comment.dislike - 1,
    })
      .then((res) => {
        toast.success(
          `${user.displayName} clicked like on ${comment.userName} comment !`,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
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
      <div type="number" style={{ width: "40px" }}>
        {comment.like}
      </div>
      <ToastContainer />
    </div>
  );
};
export default LikeCounter;
