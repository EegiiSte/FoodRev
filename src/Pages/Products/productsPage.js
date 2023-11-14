import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
import { useUserContext } from "../../context/UserContext";
import { blogsCollection } from "../../firebase/myFirebase";
import { LayoutMain } from "../../layout/LayoutMain";

import Card from "./Card";

import ModalCreateNewBlog from "./ModalCreateNewBlog";

function ProductPage(props) {
  const { user, isUserLoggedIn } = useUserContext();
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
        });
        // console.log(firebaseDocData);
        setData(firebaseDocData);
        setFilteredArray(firebaseDocData);
      });
      setLoading(false);
    };
    getData();
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
    <LayoutMain>
      <div
        className=" d-flex overFlowScroll"
        style={{
          flexDirection: "row",
        }}
      >
        <section>
          <div
            className=" width-100vw height-100vh backgroundSize-c d-flex 
        align-c just-c flex-direction-c"
            style={{
              backgroundImage: "#F5F6FA",
            }}
          >
            <div className="height-100vh width-1080 d-flex marginTop10 flex-direction-c">
              <div
                className="d-flex just-c align-c width-1080 gap-10"
                style={{
                  height: "100px",
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
                    height: "40px",
                    width: "500px",
                  }}
                  // placeholder="Search"
                ></input>
                <button
                  style={{
                    height: "46px",
                    width: "100px ",
                  }}
                >
                  Search
                </button>
              </div>
              <div
                className="width-1080"
                style={{
                  height: "450px",
                }}
              >
                {loading && <div>Loading ...</div>}
                {!loading && data.length === 0 && <div>There is not blogs</div>}
                {!loading && data.length > 0 && (
                  <div
                    className="d-flex align-start width-1080 gap-10 padding10"
                    style={{
                      height: "738px",
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
              user={user}
              openModal={openModal}
              closeModal={closeModal}
            />
          </div>
        </section>
        <section style={{ marginTop: "70px" }}></section>
      </div>
    </LayoutMain>
  );
}

export default ProductPage;
