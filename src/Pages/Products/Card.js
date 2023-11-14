import React from "react";
import { useNavigate } from "react-router-dom";
const convertNumberToArray = (number) => {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push(i);
  }
  return result;
};

function Card(props) {
  const { card } = props;
  const { userImage, text, title, stars, userName, blogId } = card;
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="box-shadow-gray"
      onClick={(e) => {
        handleProductClick(blogId);
      }}
      style={{
        width: "340px",
        cursor: "pointer",
        backgroundColor: "white",
        height: "300px",

        borderRadius: "10px",
      }}
    >
      <div
        className=" d-flex just-start align-c"
        style={{
          height: "240px",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <div
          style={{
            height: "30px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              marginTop: "5px",
            }}
          >
            {props.card.title}
          </div>
        </div>

        <div
          className=" d-flex just-start align-c flex-direction-c"
          style={{
            height: "200px",
            padding: "5px",
            overflow: "hidden",
            marginBottom: "5px",
            width: "100%",
          }}
        >
          <div
            className=" padding5 overflowHidden"
            style={{
              fontSize: "9px",
              marginBottom: "10px",
              textAlign: "center",
              height: "25px",
              width: "100%",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {card.text}
            </div>
          </div>
          {card.blogImage ? (
            <img
              style={{}}
              src={card.blogImage}
              alt={"blogImage"}
              // width="80%"
              height="80%"
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div
        className=" d-flex just-c"
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "bottom",
        // }}
      >
        <div
          className="d-flex align-c flexDirection-r"
          style={{
            marginTop: "5px",
            gap: "10px",
            height: "20px",
          }}
        >
          <img
            src={userImage}
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
            }}
            alt={{}}
          ></img>
          <div>{userName}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
