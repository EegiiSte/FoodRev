import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

import Card from "../../components/Card";
import ModalCreateNewBlog from "./ModalCreateNewBlog";
import { getDocs, onSnapshot } from "firebase/firestore";
import { blogsCollection } from "../../firebase/myFirebase";
import { ToastContainer } from "react-toastify";
import Footer from "../../components/Footer";

function ProductPage(props) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      onSnapshot(blogsCollection, (collection) => {
        const firebaseDocData = collection.docs.map((doc) => {
          const blogId = doc.id;
          const blogData = doc.data();
          blogData.blogId = blogId;
          return blogData;
          // return { ...doc.data(), blogId: doc.id };
        });
        setData(firebaseDocData);
        setFilteredArray(firebaseDocData);
      });
      setLoading(false);
    };
    return () => getData();
  }, []);

  const handleInputSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    const newPacientes = data.filter((value) =>
      value.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredArray(newPacientes);
  }, [searchValue]);

  const [openModal, setOpenModal] = useState(false);

  const handleCreateNewPostButton = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <div
      style={{
        flexDirection: "row",
      }}
    >
      <section>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: "#F5F6FA",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Header user={props.user} />
          <div
            style={
              {
                // height: "100vh",
                // width: "1080px",
              }
            }
          ></div>
          <div
            style={{
              height: "100vh",
              width: "1080px",
              display: "flex",
              marginTop: "10px",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                border: "1px solid brue",
                // backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                width: "1080 ",
                height: "100px",
                gap: "10px",
              }}
            >
              <button
                onClick={handleCreateNewPostButton}
                style={{
                  height: "46px",
                  width: "200px ",
                }}
              >
                Create new post
              </button>

              <input
                onChange={handleInputSearch}
                value={searchValue}
                placeholder="Search by name"
                style={{
                  // border: "1px solid brue",

                  height: "40px",
                  width: "500px",
                }}
                // placeholder="Search"
              ></input>
              <button
                style={{
                  // border: "1px solid brue",

                  height: "46px",
                  width: "100px ",
                }}
              >
                Search
              </button>
            </div>
            <div
              style={{
                // border: "1px solid gray",
                // backgroundColor: "green",
                width: "1080px",
                height: "450px",
              }}
            >
              {loading && <div>Loading ...</div>}
              {!loading && data.length === 0 && <div>There is not blogs</div>}
              {!loading && data.length > 0 && (
                <div
                  style={{
                    // border: "1px solid brown",
                    // backgroundColor: "pink",
                    width: "1080px",
                    height: "738px",
                    // margin: "10px",
                    padding: "10px",
                    gap: "20px",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    flexWrap: "wrap",
                    overflow: "scroll",
                    overflowBlock: "hidden",
                  }}
                >
                  {filteredArray.map((card, index) => {
                    return <Card card={card} />;
                  })}
                </div>
              )}
            </div>
          </div>
          <ModalCreateNewBlog
            user={props.user}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
        <ToastContainer />
      </section>
      <section style={{ marginTop: "70px" }}>
        <Footer />
      </section>
    </div>
  );
}

export default ProductPage;
