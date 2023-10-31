import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  commentCollection,
  replyCollection,
} from "../../../firebase/myFirebase";
import DislikeCounter from "../comment/Dislike-Counter";
import LikeCounter from "../comment/Like-Counter";
import Like from "../../../icons/Like";
import { deleteDoc, doc } from "firebase/firestore";

const CommentReply = (props) => {
  const { user, comment, replyCommentData } = props;

  const hanldeDeleteReplyComment = async (commentId) => {
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

  return (
    <div>
      {replyCommentData.map((replyComment, index) => {
        return (
          replyComment.parentCommentId === comment.commentId && (
            <div
              key={{}}
              style={{
                marginTop: "5px",
                padding: "5px",
                width: "550px",

                // border: "1px solid red",
                // boxShadow: "0px 0px 10px gray",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "end",
                flexDirection: "row",
              }}
            >
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  padding: "10px",
                }}
                src={replyComment.userImage}
                alt=""
              />
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    paddingTop: "10px",
                  }}
                >
                  {replyComment.userName}
                </div>
                <div>
                  <div // endees comment boxes ehelj bna
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      width: "440px",
                      // height: "10%",
                      // border: "1px solid blue",
                      boxShadow: "0px 0px 10px gray",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {replyComment.comment}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        gap: "20px",
                        marginTop: "15px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                          }}
                        >
                          <Like />
                          <LikeCounter comment={comment} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                          }}
                        >
                          <DislikeCounter comment={comment} />
                        </div>
                      </div>

                      {replyComment.userId === user.uid && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            alignItems: "center",
                          }}
                        >
                          <button
                            style={{
                              cursor: "pointer",
                              width: "50px",
                              height: "20px",
                            }}
                            //   onClick={(e) => {
                            //     handelOpenEditModal(comment);
                            //   }}
                          >
                            Edit
                          </button>
                          <button
                            style={{
                              cursor: "pointer",
                              width: "50px",
                              height: "20px",
                            }}
                            // onClick={(e) => {
                            //   hanldeDeleteReplyComment(replyComment.commentId);
                            // }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div // comment dotroh comment ehelj bna
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      flexDirection: "column",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default CommentReply;
