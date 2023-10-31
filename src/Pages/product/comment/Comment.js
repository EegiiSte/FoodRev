import React, { useEffect, useState } from "react";
import {
  doc,
  deleteDoc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

import {
  commentCollection,
  replyCollection,
} from "../../../firebase/myFirebase";

import { async } from "@firebase/util";
import Like from "../../../icons/Like";
import LikeCounter from "./Like-Counter";
import DislikeCounter from "./Dislike-Counter";
import EditCommentModal from "./EditCommentModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentReply from "../reply-comment/CommentReply";
import "./comment.css";

function Comment(props) {
  const { commentData, userId, blogData, user } = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const [showReply, setShowReply] = useState(false);

  const [replyCommentData, setReplyCommentData] = useState([]);

  const [parentCommentId, setParentCommentId] = useState("");

  const [inputReplyValue, setInputReplyValue] = useState();
  const [loading, setLoading] = useState(false);

  // console.log(replyCommentData);
  const handleReplyButton = (commentId) => {
    setParentCommentId(commentId);
    showReply === false ? setShowReply(true) : setShowReply(false);
    // console.log(commentId);
  };
  useEffect(() => {
    const getBlogReplyCommentData = async () => {
      setLoading(true);
      // const replyComments = await getDocs(replyCollection); // get collection

      onSnapshot(replyCollection, (collection) => {
        const firebaseReplyCommentsData = collection.docs.map((doc) => {
          // get all documents
          const replyCommentId = doc.id;
          const replyCommentData = doc.data();
          replyCommentData.replyCommentId = replyCommentId;

          return replyCommentData;
          // return ( ...doc.data(), replyCommentId: doc.id );
        });

        // const comments = firebaseReplyCommentsData.find((comment) => {
        //   // console.log(comment.parentCommentId);
        //   return comment.parentCommentId === CommentId;
        // });
        // console.log(comments);
        // setReplyCommentData(comments);

        // const ReplyCommentData = ReplyCommentsData.filter((comment) => {
        //   return comment.blogId === blog.blogId;
        // });

        const sortedReplyComments = firebaseReplyCommentsData.sort(
          (comment1, comment2) => {
            return comment2.timeStamp - comment1.timeStamp;
          }
        );
        // console.log(sortedReplyComments);
        setReplyCommentData(sortedReplyComments);
      });

      setLoading(false);
    };
    return () => getBlogReplyCommentData();
  }, [parentCommentId]);

  // const handleSendReplyButton = () => {
  //   setShowReply(false);
  // };
  // console.log(parentCommentId);
  const hanldeDeleteComment = async (commentId) => {
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
  const handleInputReplyValue = (e) => {
    setInputReplyValue(e.target.value);
  };
  const handleSendReplyButton = async (comment) => {
    // setSelectedComment(comment);
    // console.log(comment.commentId);
    await addDoc(replyCollection, {
      comment: inputReplyValue,
      // commentId: replyCommentId,
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

  const handelOpenEditModal = (comment) => {
    setSelectedComment(comment);
    setOpenEditModal(true);
  };
  const closeEditModal = () => {
    setOpenEditModal(false);
  };
  return (
    <div>
      {commentData.map((comment, index) => {
        return (
          <div className="commentMainBox borderR5 " key={{}}>
            <img className="userImageComment" src={comment.userImage} alt="" />
            <div>
              <div className="userNameComment">{comment.userName}</div>
              <div>
                <div // endees comment boxes ehelj bna
                  className=" commentSecondBox"
                >
                  <div
                    className=" commentTextBox displayJustCenAlinCen"
                    key={index}
                  >
                    {comment.comment}
                  </div>
                  <div className=" bottomButtonBox">
                    <div className=" LikeReplyButtonBox">
                      <div className=" likeCountBox">
                        <Like />
                        <LikeCounter comment={comment} />
                      </div>
                      <div className=" dislikeCountBox">
                        <DislikeCounter comment={comment} />
                      </div>
                      <div>
                        <button
                          className=" replyButton"
                          onClick={(e) => {
                            handleReplyButton(comment.commentId);
                          }}
                        >
                          Reply
                        </button>
                      </div>
                    </div>

                    {comment.userId === userId && (
                      <div className="  editDeleteButtonBox displayAlinCenter">
                        <button
                          className="borderRed"
                          style={{
                            cursor: "pointer",
                            width: "50px",
                            height: "20px",
                          }}
                          onClick={(e) => {
                            handelOpenEditModal(comment);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            cursor: "pointer",
                            width: "50px",
                            height: "20px",
                          }}
                          onClick={(e) => {
                            hanldeDeleteComment(comment.commentId);
                          }}
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
                >
                  {showReply && comment.commentId === parentCommentId && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <input
                        onChange={handleInputReplyValue}
                        placeholder="Enter reply comment"
                        value={inputReplyValue}
                        style={{
                          marginTop: "10px",
                          padding: "10px",
                          width: "480px",
                          // height: "10%",
                          border: "1px solid yellow",
                          boxShadow: "0px 0px 10px gray",
                          borderRadius: "5px",
                        }}
                      ></input>

                      <button
                        style={{
                          border: "1px solid yellow",
                          boxShadow: "0px 0px 10px gray",
                          borderRadius: "5px",
                          marginTop: "10px",
                          padding: "10px",
                          cursor: "pointer",
                          width: "50px",
                          height: "37px",
                        }}
                        onClick={(e) => {
                          handleSendReplyButton(comment);
                        }}
                      >
                        Send
                      </button>
                    </div>
                  )}
                  <CommentReply
                    comment={comment}
                    user={user}
                    replyCommentData={replyCommentData}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <EditCommentModal
        openEditModal={openEditModal}
        selectedComment={selectedComment}
        closeEditModal={closeEditModal}
      />
      <ToastContainer />
    </div>
  );
}

export default Comment;
