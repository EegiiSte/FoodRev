import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";

import "react-toastify/dist/ReactToastify.css";
import {
  commentCollection,
  replyCollection,
} from "../../../../firebase/myFirebase";
import Like from "../../../../icons/Like";
import DislikeCounter from "../Dislike-Counter";
import LikeCounter from "../Like-Counter";
import EditReplyCommentModal from "./EditReplyCommentModal";
import CommentReplyEditAndDelete from "./CommentReplyEditAndDelete";
import { toast } from "react-toastify";

const CommentReply = (props) => {
  const { user, comment, replyCommentData } = props;
  const [openEditReplyModal, setOpenEditReplyModal] = useState(false);
  const [selectedReplyComment, setSelectedReplyComment] = useState({});
  // console.log(selectedReplyComment);
  const closeEditReplyModal = () => {
    setOpenEditReplyModal(false);
  };

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
              className="borderR5 d-flex just-end flexDirection-r "
              style={{
                marginTop: "5px",
                padding: "5px",
                width: "550px",
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
                <div className="d-flex just-start paddingTop10 ">
                  {replyComment.userName}
                </div>
                <div>
                  <div // endees comment boxes ehelj bna
                    className="marginTop10 padding10 box-shadow-gray borderR5"
                    style={{
                      width: "440px",
                    }}
                  >
                    <div key={index} className="d-flex just-c align-c">
                      {replyComment.comment}
                    </div>
                    <div
                      className="d-flex just-space-between align-c flex-direction-row gap-20"
                      style={{
                        marginTop: "15px",
                      }}
                    >
                      <div className="d-flex flex-direction-row align-c gap-10">
                        <div>
                          <LikeCounter
                            comment={replyComment}
                            key={replyComment.replyCommentId}
                            collection={replyCollection}
                            id={replyComment.replyCommentId}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                          }}
                        >
                          <DislikeCounter
                            comment={replyComment}
                            key={replyComment.replyCommentId}
                            collection={replyCollection}
                            id={replyComment.replyCommentId}
                          />
                        </div>
                      </div>

                      {replyComment.userId === user.uid && (
                        <CommentReplyEditAndDelete
                          key={replyComment.replyCommentId}
                          closeEditReplyModal={closeEditReplyModal}
                          setSelectedReplyComment={setSelectedReplyComment}
                          setOpenEditReplyModal={setOpenEditReplyModal}
                          replyComment={replyComment}
                        />
                      )}
                    </div>
                  </div>
                  <div // comment dotroh comment ehelj bna
                    className="d-flex just-c flex-direction-c"
                  ></div>
                </div>
                <EditReplyCommentModal
                  replyComment={replyComment}
                  selectedReplyComment={selectedReplyComment}
                  openEditReplyModal={openEditReplyModal}
                  closeEditReplyModal={closeEditReplyModal}
                />
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default CommentReply;
