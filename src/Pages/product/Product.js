import {
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogsCollection, commentCollection } from "../../firebase/myFirebase";
import Header from "../../components/Header";
import Comments from "./comment/Comments";
import EditProduct from "./EditProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer";

function Product(props) {
  const { user } = props;
  const { id } = useParams();
  const selectedBlogId = id;
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({});
  const [commentData, setCommentData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});

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
    <div>
      {loading && <div>Loading ...</div>}
      {!loading && blogData === undefined && <div>Blog not Found</div>}
      {!loading && blogData !== undefined && (
        <div
          style={{
            width: "100vw",
            // height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
          }}
        >
          <Header user={props.user} />
          <div
            style={{
              width: "100vw",
              // height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              flexDirection: "column",
              marginTop: "3%",
            }}
          >
            <div>
              {blogData.userId === user.uid && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    alignItems: "center",
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
            <div
              style={{
                width: "700px",
                // height: "50vh",
                cursor: "pointer",
                backgroundColor: "white",
                boxShadow: "0px 0px 10px gray",
                // border: "1px solid black",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
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
                      width: "300%",
                      borderBottom: "2px solid red",
                    }}
                  ></div>
                </div>

                <div
                  style={{
                    height: "160px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      marginTop: "10px",

                      textAlign: "center",
                    }}
                  >
                    {blogData.text}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "front",
                    alignItems: "bottom",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      //   marginTop: "20px",
                      //   padding: "10px",

                      gap: "10px",
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
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",

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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                flexDirection: "column",
              }}
            >
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
      <ToastContainer />
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
