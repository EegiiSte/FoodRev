import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./Comment";
import "./comment.css";

function Comments(props) {
  const { commentData, userId, blogData, user } = props;
  return (
    <div>
      {commentData.map((comment, index) => {
        return (
          <Comment
            key={index}
            comment={comment}
            userId={userId}
            blogData={blogData}
            user={user}
          />
        );
      })}
      <ToastContainer />
    </div>
  );
}

export default Comments;
