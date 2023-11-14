import { getCountFromServer, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import {
  blogsCollection,
  commentCollection,
  replyCollection,
} from "../../firebase/myFirebase";
import { LayoutMain } from "../../layout/LayoutMain";

function ProfilesPage(props) {
  const { user } = props;

  const [blogsCount, setBlogsCount] = useState();
  const [commentCount, setCommentCount] = useState();
  const [replyCommentCount, setReplyCommentCount] = useState();

  console.log("ProfilesPage>blogsCount", blogsCount);
  console.log("ProfilesPage>comment", commentCount);
  console.log("ProfilesPage>replyCommentCount", replyCommentCount);

  const commentsCount = async () => {
    const snapshot = await getCountFromServer(commentCollection);
    setCommentCount(snapshot.data().count);
  };
  const BlogsCount = async () => {
    const snapshot = await getCountFromServer(blogsCollection);
    setBlogsCount(snapshot.data().count);
  };
  const replyCount = async () => {
    const snapshot = await getCountFromServer(replyCollection);
    setReplyCommentCount(snapshot.data().count);
  };

  useEffect(() => {
    commentsCount();
    replyCount();
    BlogsCount();
  }, [blogsCollection, commentCollection, replyCollection]);

  // console.log("count: ", snapshot.data().count);

  return (
    <LayoutMain>
      <div
        className="d-flex just-c align-c flex-direction-c width-100vw height-100vh"
        style={{
          backgroundImage: "#F5F6FA",
          backgroundSize: "cover",
        }}
      >
        <div className="width-100pr height-100pr d-flex juct-c align-c position-rel">
          {" "}
          <div
            style={{
              width: "90%",
              height: "65%",
              backgroundColor: "white",
              position: "absolute",
              left: "5%",
              top: "30%",
            }}
          >
            <div
              style={{
                width: "90%",
                height: "20%",
                left: "5%",
                top: "20%",

                position: "absolute",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "20%",
                  height: "80%",

                  position: "absolute",
                  left: "40%",
                  top: "10%",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {blogsCount}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "gray",
                  }}
                >
                  Posts
                </div>
              </div>
              <div
                style={{
                  width: "20%",
                  height: "80%",

                  position: "absolute",
                  left: "55%",
                  top: "10%",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {commentCount + replyCommentCount}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "gray",
                  }}
                >
                  Comments
                </div>
              </div>
            </div>
            <div
              style={{
                width: "90%",
                height: "50%",

                position: "absolute",
                left: "5%",
                top: "45%",
              }}
            >
              <div
                style={{
                  width: "70%",
                  height: "20%",

                  position: "absolute",
                  left: "15%",
                  top: "10%",

                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Name:
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "gray",
                  }}
                >
                  {props.user.displayName}
                </div>
              </div>
              <div
                style={{
                  width: "70%",
                  height: "20%",

                  position: "absolute",
                  left: "15%",
                  top: "40%",

                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Email:
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "Gray",
                  }}
                >
                  {props.user.email}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "150px",
            height: "150px",
            // backgroundColor: "red",
            borderRadius: "50%",

            position: "absolute",
            left: "23%",
            top: "35%",
          }}
        >
          <img
            // src={HomeImageMeeting}
            src={user.photoURL}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              boxShadow: "0px 0px 10px gray",
            }}
            alt={{}}
          ></img>
        </div>
        <div
          style={{
            width: "70%",
            height: "70%",
            backgroundColor: "#F8F9FF",
          }}
        ></div>
      </div>
    </LayoutMain>
  );
}

export default ProfilesPage;
