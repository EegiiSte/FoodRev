import { addDoc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { replyCollection } from "../../../firebase/myFirebase";
import "./comment.css";

const DisplayCommentReplyInput = (props) => {
  const { blogData, user, setShowReply, comment } = props;

  const [inputReplyValue, setInputReplyValue] = useState();

  const handleInputReplyValue = (e) => {
    setInputReplyValue(e.target.value);
  };
  const handleSendReplyButton = async (comment) => {
    await addDoc(replyCollection, {
      comment: inputReplyValue,
      parentCommentId: comment.commentId,
      blogId: blogData.blogId,
      userId: user.uid,
      userName: user.displayName,
      userImage: user.photoURL,
      timeStamp: serverTimestamp(),
      like: 0,
      dislike: 0,
    })
      .then((res) => {
        toast.success("Your comment  added!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setInputReplyValue("");
        setShowReply(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" replyInputBox d-flex just-end align-c borderR5 borderShadowGray">
      <input
        className=" replyInput borderR5"
        onChange={handleInputReplyValue}
        placeholder="Enter reply comment"
        value={inputReplyValue}
      />
      <button
        className="borderShadowGray marginTop10 padding10 borderR5 replySendButton"
        onClick={(e) => {
          handleSendReplyButton(comment);
        }}
      >
        Send
      </button>
    </div>
  );
};
export default DisplayCommentReplyInput;
