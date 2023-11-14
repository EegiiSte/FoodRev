import { Rate } from "antd";
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header/Header";
import { useUserContext } from "../../../context/UserContext";
import {
  blogsCollection,
  commentCollection,
} from "../../../firebase/myFirebase";
import { LayoutMain } from "../../../layout/LayoutMain";
import Comments from "../comment/Comments";
import EditProduct from "./EditProduct";
import RateAddBlog from "./RateAdd";

function Product(props) {
  const {} = props;

  const { user } = useUserContext();
  const { id } = useParams();
  const selectedBlogId = id;
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({});
  // console.log(blogData.stars);
  const [commentData, setCommentData] = useState([]);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  // console.log(blogData);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const getBlogPageData = async () => {
      setLoading(true);
      // const blogs = await getDocs(blogsCollection); // get collection

      onSnapshot(blogsCollection, (collection) => {
        const blogsData = collection.docs.map((doc) => {
          // get all documents
          const blogId = doc.id;
          const blogData = doc.data();
          blogData.blogId = blogId;
          return blogData;
        });

        const blog = blogsData.find((blog) => {
          return blog.blogId === selectedBlogId;
        }); // find selectedBlog  if blogId === id(params)
        setBlogData(blog);

        // console.log("product", blogsData);

        if (blog) {
          onSnapshot(commentCollection, (collection) => {
            const firebaseCommentData = collection.docs.map((doc) => {
              // const commentId = doc.id;
              // const commentData = doc.data();
              // commentData.commentId = commentId;
              // return commentData;

              return { ...doc.data(), commentId: doc.id };
            });
            setCommentData(commentData);

            const blogComments = firebaseCommentData.filter((comment) => {
              return comment.blogId === blog.blogId;
            });
            // console.log(blogComments);
            const sortedComments = blogComments.sort((comment1, comment2) => {
              return comment2.timeStamp - comment1.timeStamp;
            });
            setCommentData(sortedComments);
          });
        }

        setLoading(false);
      });
    };
    getBlogPageData();
  }, [selectedBlogId]);

  const handleCommentButton = async () => {
    await addDoc(commentCollection, {
      comment: inputValue,
      blogId: blogData.blogId,
      userId: user.uid,
      userName: user.displayName,
      userImage: user.photoURL,
      timeStamp: serverTimestamp(),
      like: 0,
      dislike: 0,
    })
      .then((res) => {
        toast.success("Comment created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setInputValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hanldeDeleteBlog = async (blogId) => {
    await deleteDoc(doc(blogsCollection, blogId))
      .then(async (res) => {
        console.log(res);
        await commentData.map((comment) => {
          deleteDoc(doc(commentCollection, comment.commentId))
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });
        });

        toast.warn("Post deleted successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditBlogButton = (blog) => {
    setOpenEditModal(true);
    // console.log(blog);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <LayoutMain>
      <div className="d-flex just-c flex-direction-c">
        {loading && <div>Loading ...</div>}
        {!loading && blogData === undefined && <div>Blog not Found</div>}
        {!loading && blogData !== undefined && (
          <div className="width-100vw d-flex just-c flex-direction-c">
            <div
              className="width-100vw d-flex align-c just-start flex-direction-c"
              style={{
                marginTop: "30px",
              }}
            >
              <div className="d-flex just-end flex-direction-row  gap-20">
                <div>
                  {blogData.userId === user.uid && (
                    <div
                      className="d-flex flex-direction-row gap-20 align-c "
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <button
                        style={{
                          cursor: "pointer",
                          width: "50px",
                          height: "20px",
                        }}
                        onClick={(e) => {
                          handleEditBlogButton(blogData);
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
                          hanldeDeleteBlog(blogData.blogId);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="box-shadow-gray borderR10"
                style={{
                  width: "700px",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                <div
                  className="d-flex flex-direction-c just-c align-c padding10
              position-rel"
                >
                  <div
                    className="d-flex just-c flex-direction-c"
                    style={{
                      height: "30px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      {blogData.title}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        borderBottom: "2px solid gray",
                      }}
                    ></div>
                  </div>
                  <div className="d-flex flex-direction-c just-c align-c">
                    <div className=" overFlowHidden  d-flex just-c ">
                      <img
                        src={blogData.blogImage}
                        alt={"blodDataImage"}
                        width="350px"
                        // height="150px"
                      />
                    </div>
                    <div
                      className=" padding10 overFlowHidden "
                      style={{
                        // minHeight: "160px",
                        maxWidth: "500px",
                        marginTop: "10px",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      {blogData.text}
                    </div>
                  </div>

                  <div
                    className=" d-flex flex-direction-row just-space-between align-start"
                    style={{ width: "90%" }}
                  >
                    <div
                      className=" d-flex flex-direction-row align-c gap-10 "
                      style={{
                        height: "20px",
                      }}
                    >
                      <img
                        src={blogData.userImage}
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                        alt={{}}
                      ></img>
                      <div>{blogData.userName}</div>
                    </div>
                    <span className="d-flex just-c align-c">
                      <RateAddBlog blogData={blogData} />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="d-flex flex-direction-row gap-20 "
                style={{
                  marginTop: "30px",
                }}
              >
                <input
                  onChange={handleInputValue}
                  value={inputValue}
                  placeholder="Leave your comment"
                  style={{
                    width: "300px",
                    height: "40px",
                    border: "1px solid  gray",
                    borderRadius: "5px",
                  }}
                ></input>
                <button
                  onClick={handleCommentButton}
                  style={{
                    width: "100px",
                    height: "44px",
                    backgroundColor: "lightblue",
                    border: "1px solid  gray",
                    borderRadius: "5px",
                  }}
                >
                  Comment
                </button>
              </div>
              <div className="d-flex align-c just-c flex-direction-c text-align-c">
                {commentData.length > 0 && (
                  <Comments
                    blogData={blogData}
                    commentData={commentData}
                    userId={user.uid}
                    user={user}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <EditProduct
          openEditModal={openEditModal}
          closeEditModal={closeEditModal}
          blogData={blogData}
        />

        <div
          style={{
            marginTop: "10px",
          }}
        ></div>
      </div>
    </LayoutMain>
  );
}

export default Product;
