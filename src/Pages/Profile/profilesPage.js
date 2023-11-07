import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import HomeImageMeeting from "../../images/Mask-group.png";
import { getDocs } from "firebase/firestore";
import { blogsCollection } from "../../firebase/myFirebase";

function ProfilesPage(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const firebaseCollectionInfo = await getDocs(blogsCollection);
      const firebaseDocData = firebaseCollectionInfo.docs.map((doc) => {
        return doc.data();
      });
      setData(firebaseDocData);
    };
    getData();
  }, []);

  const { user } = props;

  return (
    <div
      className="d-flex just-c align-c flex-direction-c width-100vw height-100vh"
      style={{
        backgroundImage: "#F5F6FA",
        backgroundSize: "cover",
      }}
    >
      <Header user={props.user} />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          position: "relative",
        }}
      >
        <div
          style={{
            width: "60%",
            height: "50%",
            backgroundColor: "white",
            position: "absolute",
            left: "20%",
            top: "30%",
            boxShadow: "0px 0px 10px gray",
          }}
        >
          <button
            style={{
              width: "16%",
              height: "7%",
              backgroundColor: "#08CDEF",
              position: "absolute",
              left: "3%",
              top: "3%",
              borderRadius: "10px",

              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "14px",
              }}
            >
              Edit Profile
            </div>
          </button>
          <button
            style={{
              width: "16%",
              height: "7%",
              backgroundColor: "#162C4E",
              position: "absolute",
              left: "77%",
              top: "3%",
              borderRadius: "10px",

              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: "14px",
              }}
            >
              Message
            </div>
          </button>
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

                position: "absolute",
                left: "5%",
                top: "20%",

                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "20%",
                  height: "80%",

                  position: "absolute",
                  left: "5%",
                  top: "10%",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                  }}
                >
                  22
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "gray",
                  }}
                >
                  Friends
                </div>
              </div>
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
                    fontSize: "14px",
                  }}
                >
                  {data.length}
                </div>
                <div
                  style={{
                    fontSize: "12px",
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
                  left: "75%",
                  top: "10%",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                  }}
                >
                  89
                </div>
                <div
                  style={{
                    fontSize: "12px",
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
                    fontSize: "14px",
                  }}
                >
                  Name:
                </div>
                <div
                  style={{
                    fontSize: "12px",
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
                    fontSize: "14px",
                  }}
                >
                  Email:
                </div>
                <div
                  style={{
                    fontSize: "12px",
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
            width: "200px",
            height: "200px",
            // backgroundColor: "red",
            borderRadius: "50%",

            position: "absolute",
            left: "center",
            top: "20%",
          }}
        >
          <img
            // src={HomeImageMeeting}
            src={user.photoURL}
            style={{
              width: "200px",
              height: "200px",
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
    </div>
  );
}

export default ProfilesPage;
