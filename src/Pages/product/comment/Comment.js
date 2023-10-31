import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  commentCollection,
  replyCollection,
} from "../../../firebase/myFirebase";
import Like from "../../../icons/Like";
import CommentReply from "../reply-comment/CommentReply";
import CommentEditAndDelete from "./CommentEditAndDelete";
import DislikeCounter from "./Dislike-Counter";
import DisplayCommentReplyInput from "./DisplayCommentReplyInput";
import EditCommentModal from "./EditCommentModal";
import LikeCounter from "./Like-Counter";
import "./comment.css";

const Comment = (props) => {
  const { comment, userId, blogData, user, setParentCommentId } = props;

  const [showReply, setShowReply] = useState(false);
  const [replyCommentData, setReplyCommentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlogReplyCommentData = async () => {
      onSnapshot(replyCollection, (collection) => {
        const firebaseReplyCommentsData = collection.docs.map((doc) => {
          const replyCommentId = doc.id;
          const replyCommentData = doc.data();
          replyCommentData.replyCommentId = replyCommentId;
          return replyCommentData;
        });
        const sortedReplyComments = firebaseReplyCommentsData.sort(
          (comment1, comment2) => {
            return comment2.timeStamp - comment1.timeStamp;
          }
        );
        const filteredReplyComments = sortedReplyComments.filter((data) => {
          return data.parentCommentId === comment.commentId;
        });
        setReplyCommentData(filteredReplyComments);
      });
      setLoading(false);
    };
    return () => getBlogReplyCommentData();
  }, [comment]);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});

  const handleReplyButton = (commentId) => {
    setParentCommentId(commentId);
    showReply === false ? setShowReply(true) : setShowReply(false);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div className="commentMainBox borderR5 " key={{}}>
      <img className="userImageComment" src={comment.userImage} alt="" />
      <div>
        <div className="userNameComment">{comment.userName}</div>
        <div>
          <div className=" commentSecondBox">
            <div className=" commentTextBox displayJustCenAlinCen">
              {comment.comment}
            </div>
            <div className=" bottomButtonBox">
              <div className=" LikeReplyButtonBox">
                <div className=" likeCountBox">
                  <Like />
                  <LikeCounter
                    key={comment.id}
                    comment={comment}
                    collection={commentCollection}
                    id={comment.commentId}
                  />
                </div>
                <div className=" dislikeCountBox">
                  <DislikeCounter
                    key={comment.id}
                    comment={comment}
                    collection={commentCollection}
                    id={comment.commentId}
                  />
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
                <CommentEditAndDelete
                  comment={comment}
                  setSelectedComment={setSelectedComment}
                  setOpenEditModal={setOpenEditModal}
                />
              )}
            </div>
          </div>
          <div className=" replyCommentMainBox">
            {showReply && (
              <DisplayCommentReplyInput
                blogData={blogData}
                user={user}
                comment={comment}
                setShowReply={setShowReply}
              />
            )}
          </div>
          <CommentReply
            comment={comment}
            user={user}
            replyCommentData={replyCommentData}
          />
        </div>
      </div>
      <EditCommentModal
        openEditModal={openEditModal}
        selectedComment={selectedComment}
        closeEditModal={closeEditModal}
      />
    </div>
  );
};

export default Comment;
