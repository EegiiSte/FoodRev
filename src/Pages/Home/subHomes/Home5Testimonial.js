import React, { useEffect, useState } from "react";
import testimonialData from "./TestimonialData";
import StartIcon from "../../../icons/StarIcon";
import { getDocs } from "firebase/firestore";
import { blogsCollection } from "../../..//firebase/myFirebase";
import "../../product/comment/comment.css";

const convertNumberToArray = (number) => {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push(i);
  }
  return result;
};

function Home5Testimonial(props) {
  const { user, isUserLoggedIn } = props;
  const [data, setData] = useState([]);
  // console.log(data);

  useEffect(() => {
    const getData = async () => {
      if (isUserLoggedIn) {
        const firebaseCollectionInfo = await getDocs(blogsCollection);
        const firebaseDocData = firebaseCollectionInfo.docs.map((doc) => {
          return doc.data();
        });
        setData(firebaseDocData);
      }
    };
    getData();
  }, [isUserLoggedIn]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextButton = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevButton = () => {
    setCurrentIndex(currentIndex - 1);
  };
  const disablePrevButton = currentIndex === 0;
  const disableNextButton = currentIndex === testimonialData.length - 2;

  return (
    <div
      className=""
      style={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F6FA",
      }}
    >
      {!isUserLoggedIn && <div></div>}
      {isUserLoggedIn && (
        <div
          className=""
          style={{
            width: "1080px",
            height: "100%",
            // backgroundColor: "red",
            backgroundColor: "transparent",
            position: "relative",
          }}
        >
          <div
            className=" displayJustCenAlinCen"
            style={{
              height: "150px",
              width: "1080px",
              color: "#000",
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: "800",
              lineHeight: "normal",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            What people say about us
          </div>
          <div
            className=""
            style={{
              width: "97vw",
              position: "absolute",
              transform: "translateX(-12%)",
              overflow: "hidden",
              width: "100vw",
              position: "relative",
              left: "0",
            }}
          >
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                height: "390px",
                gap: "30px",
                width: `${data.length * 400}px`,
                transform: `translateX(-${currentIndex * 400}px)`,
              }}
            >
              {data.map((card, index) => {
                return (
                  <div
                    className=" borderR5 borderShadowGray"
                    key={index}
                    style={{
                      minWidth: "366px",
                      backgroundColor: "white",
                      height: "374px",
                    }}
                  >
                    <div
                      className=" displayJustCenAlinCen"
                      style={{
                        height: "354px",
                        flexDirection: "column",
                        padding: "10px",
                        gap: "10px",
                      }}
                    >
                      <div
                        className=" displayJustCenAlinCen"
                        style={{
                          overflow: "hidden",
                          height: "30px",
                          width: "300px",
                        }}
                      >
                        {convertNumberToArray(card.stars).map((num) => {
                          return <StartIcon />;
                        })}
                      </div>
                      <div
                        className=" displayJustCenAlinCen overFlowHidden"
                        style={{
                          overflow: "hidden",
                          height: "30px",
                          width: "300px",
                        }}
                      >
                        {card.title}
                      </div>
                      <div
                        className=" displayAlinCen overFlowHidden"
                        style={{
                          textAlign: "center",
                          height: "140px",
                          width: "300px",
                        }}
                      >
                        {card.text}
                      </div>
                      <div
                        className=" displayJustCenAlinCen"
                        style={{
                          width: "300px",
                          height: "70px",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          className="  displayJustCenAlinCen"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <img
                            className="borderR50pr"
                            style={{
                              height: "70px",
                              width: "70px",
                            }}
                            src={card.userImage}
                            alt={{}}
                          ></img>
                          <div>{card.userName}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className=" displayJustCenAlinCen"
              style={{
                height: "70px",
                gap: "20px",
              }}
            >
              <button
                className="buttonNextPrev borderR5"
                onClick={handlePrevButton}
                disabled={disablePrevButton}
              >
                Prev
              </button>
              <button
                className="buttonNextPrev borderR5 "
                onClick={handleNextButton}
                disabled={disableNextButton}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home5Testimonial;
