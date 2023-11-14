import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { commentCollection, database } from "../../../firebase/myFirebase";

const NewLikeCounter = (props) => {
  const { comment, id, user } = props;
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const calcLike = async () => {
    const replyCollection = collection(
      database,
      `comments/${comment.commentId}/reply`
    );
    const snapshot = await getCountFromServer(replyCollection);
    // console.log("count: ", snapshot.data().count);
    setLikeCount(snapshot.data().count);
  };

  useEffect(() => {
    calcLike();
  }, [props.comment]);

  console.log("NewLikeCounter>commenet", comment);
  const handleLikeComment = async () => {
    try {
      const commentRef = doc(collection, id);
      const replysCollection = collection(database, `comments/${id}/reply`);

      const newLikeDocRef = doc(replysCollection, user.uid);
      const likeDocData = await getDoc(newLikeDocRef);

      //   let oldLike = comment.like > 0 ? comment.like : 0;
      if (likeDocData.exists()) {
        await updateDoc(commentRef, {
          like: comment.like + 1,
          dislike: comment.dislike === 0 ? 0 : comment.dislike - 1,
        });

        await updateDoc(newLikeDocRef, {
          like: 1,
        });
      }
    } catch (error) {
      console.error("failed", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <button
        onClick={handleLikeComment}
        disabled={buttonLoading}
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
export default NewLikeCounter;
