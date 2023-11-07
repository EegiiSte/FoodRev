import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
import { blogsCollection, commentCollection } from "../../firebase/myFirebase";
import Comments from "./comment/Comments";
import EditProduct from "./EditProduct";
import { Rate } from "antd";
import { useUserContext } from "../../context/UserContext";

function Product(props) {
  const {} = props;
  const { user } = useUserContext();
  const { id } = useParams();
  const selectedBlogId = id;
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({});
  console.log(blogData.stars);
  const [commentData, setCommentData] = useState([]);

  const [starValue, setStarValue] = useState(blogData?.stars);
  console.log(blogData);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});

  // console.log(selectedBlog);
  console.log(starValue);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const updateStarValue = async () => {
    await updateDoc(doc(blogsCollection, selectedBlog.blogId), {
      ...selectedBlog,
      stars: starValue,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectStarRate = async (value) => {
    setStarValue(value);
    updateStarValue();
  };

  // console.log(commentData);

  // console.log(blogData);
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

        // console.log(blogsData);

        if (blog) {
          onSnapshot(commentCollection, (collection) => {
            const firebaseCommentData = collection.docs.map((doc) => {
              const commentId = doc.id;
              const commentData = doc.data();
              commentData.commentId = commentId;
              return commentData;

              // return { ...doc.data(), commentId: doc.id };
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
    return () => getBlogPageData();
  }, [selectedBlogId, starValue]);

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
    setSelectedBlog(blog);
    setOpenEditModal(true);
    // console.log(blog);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div className="d-flex just-c flex-direction-c">
      {loading && <div>Loading ...</div>}
      {!loading && blogData === undefined && <div>Blog not Found</div>}
      {!loading && blogData !== undefined && (
        <div className="width-100vw d-flex just-c flex-direction-c">
          <Header user={props.user} />
          <div
            className="width-100vw d-flex align-c just-start flex-direction-c"
            style={{
              marginTop: "3%",
            }}
          >
            <div className="d-flex flex-direction-row  gap-20">
              <div></div>
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
              <div>
                <span>
                  <Rate
                    tooltips={desc}
                    // onChange={setStarValue}
                    onChange={handleSelectStarRate}
                    value={starValue}
                  />
                  {starValue ? (
                    <span className="ant-rate-text">{desc[starValue - 1]}</span>
                  ) : (
                    ""
                  )}
                </span>
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
                      marginTop: "10px",
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

                <div
                  style={{
                    // minHeight: "160px",
                    fontSize: "10px",
                    marginTop: "10px",

                    textAlign: "center",
                  }}
                >
                  {blogData.text}
                </div>
                <div className="borderR10 overFlowHidden margin20 " style={{}}>
                  <img
                    src={blogData.blogImage}
                    alt={"blodDataImage"}
                    width="350px"
                    height="150px"
                  />
                </div>

                <div className="d-flex flex-direction-c just-start align-end">
                  <div
                    className="d-flex flex-direction-row align-c gap-10 "
                    style={{
                      height: "20px",
                    }}
                  >
                    <img
                      src={blogData.userImage}
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                      alt={{}}
                    ></img>
                    <div>{blogData.userName}</div>
                  </div>
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
        selectedBlog={selectedBlog}
        closeEditModal={closeEditModal}
      />

      <div
        style={{
          marginTop: "10px",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}

export default Product;
