import { Button } from "antd";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { LayoutMain } from "../../layout/LayoutMain";
import HomePagePic from "../../images/Food.png";
// import HomePagePic from "../../images/imageMain.jpeg";
// import HomePagePic from "./HomePagePic.jpeg";
import { SearchOutlined, LoginOutlined } from "@ant-design/icons";
import { useState } from "react";
import SignOpenModal from "../../components/Header/SignOpenModal";

export const HomeNewPage = (props) => {
  const { isUserLoggedIn } = useUserContext();
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  return (
    <LayoutMain>
      <div
        className="bgImageCover"
        style={{ backgroundImage: `url(${HomePagePic})` }}
      >
        <div className="bigHomeText" style={{ marginBottom: 15 }}>
          Steamy, salty, perfection
        </div>
        {isUserLoggedIn && (
          <Link to="/products">
            <Button
              icon={<SearchOutlined />}
              type="primary"
              size="large"
              shape="round"
              danger
            >
              Products
            </Button>
          </Link>
        )}
        {!isUserLoggedIn && <Link to="/sign-in"></Link>}
      </div>
    </LayoutMain>
  );
};
