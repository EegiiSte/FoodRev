import React, { useEffect, useState } from "react";
import testimonialData from "./TestimonialData";
import StartIcon from "../../../icons/StarIcon";
import { getDocs } from "firebase/firestore";
import { blogsCollection } from "../../..//firebase/myFirebase";

const convertNumberToArray = (number) => {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push(i);
  }
  return result;
};

function Home5Testimonial() {
  const [data, setData] = useState([]);
  // console.log(data);
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
      style={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F6FA",
      }}
    >
      <div
        style={{
          width: "1080px",
          height: "100%",
          // backgroundColor: "red",
          backgroundColor: "transparent",
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#000",
            paddingTop: "160px",
            paddingBottom: "120px",
            fontSize: "48px",
            fontStyle: "normal",
            fontWeight: "800",
            lineHeight: "normal",
            textAlign: "center",
          }}
        >
          What people say about us
        </div>
        <div
          style={{
            // marginLeft: "-260px",
            // backgroundColor: "blue",
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
                  key={index}
                  style={{
                    minWidth: "366px",
                    backgroundColor: "white",
                    height: "374px",
                    boxShadow: "0px 0px 10px gray",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "center",
                      padding: "30px",
                    }}
                  >
                    <div>
                      {convertNumberToArray(card.stars).map((num) => {
                        return <StartIcon />;
                      })}
                    </div>
                    <div
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      {card.text}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "front",
                        alignItems: "bottom",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: "70px",
                          padding: "10px",

                          gap: "70px",
                        }}
                      >
                        <img src={card.userImage}></img>
                        <div>{card.userName}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={handlePrevButton} disabled={disablePrevButton}>
              Prev
            </button>
            <button onClick={handleNextButton} disabled={disableNextButton}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home5Testimonial;