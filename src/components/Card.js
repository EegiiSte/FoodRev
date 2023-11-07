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
        width: "250px",
        cursor: "pointer",
        backgroundColor: "white",
        height: "230px",

        borderRadius: "10px",
      }}
    >
      <div
        className=" d-flex just-c align-c"
        style={{
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
              marginTop: "10px",
            }}
          >
            {props.card.title}
          </div>
        </div>

        <div
          style={{
            height: "130px",
            padding: "10px",
            overflow: "hidden",
            marginBottom: "5px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            {props.card.text}
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
    </div>
  );
}

export default Card;
