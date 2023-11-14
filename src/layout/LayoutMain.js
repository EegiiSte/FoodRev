import {
  CopyrightOutlined,
  createFromIconfontCN,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Popover, Space } from "antd";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignOpenModal from "../components/Header/SignOpenModal";
import SignUpModal from "../components/Header/SignUpModal";
import { useUserContext } from "../context/UserContext";
import { myAuthentication } from "../firebase/myFirebase";
import Logo from "../icons/Logo";
import SignUpAntdModal from "./SignUpAntdModal";

export const LayoutMain = (props) => {
  const { isUserLoggedIn, isAdmin, user } = useUserContext();
  const [selectedMenusKeys, setSelectedMenusKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [signUpModalShow, setSignUpModalShow] = useState(false);

  // const handleSignUpModalCancel = () => {
  //   setSignUpModalShow(false);
  // };

  useEffect(() => {
    // console.log("location", location);
    if (location) {
      setSelectedMenusKeys([location.pathname]);
    }
  }, [location]);

  const handleSignOut = async () => {
    await signOut(myAuthentication)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });

  const navbarItems = [
    {
      key: "/",
      label: <Link to="/">Home</Link>,
    },
  ];

  if (isUserLoggedIn) {
    navbarItems.push({
      key: "/products",
      label: <Link to="/products">Products</Link>,
    });
    navbarItems.push({
      key: "/profile",
      label: <Link to="/profile">Profile</Link>,
    });

    navbarItems.push({
      key: "/contact",
      label: <Link to="/contact">Contact</Link>,
    });
  }

  if (isAdmin) {
    navbarItems.push({
      key: "/admin",
      label: <Link to="/admin">Admin</Link>,
    });
  }

  return (
    <Layout>
      <Layout.Header
        className="d-flex align-c layoutHeader"
        style={{
          gap: 15,
          flexWrap: "nowrap",
        }}
      >
        <Logo
          className="LayoutLogo"
          style={{
            cursor: "pointer",
          }}
        />
        <div
          className="d-flex align-c gap-15 width-100pr just-space-between"
          style={{
            flexWrap: "nowrap",
          }}
        >
          <Menu
            className="LayoutMenu"
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedMenusKeys}
            items={navbarItems}
            style={{ width: "100vw" }}
          />
          <div>
            {isUserLoggedIn ? (
              <div>
                <Popover
                  content={
                    <Button type="link" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  }
                >
                  <Link to="/profile" style={{ color: "white" }}>
                    Hello_{user.email}
                  </Link>
                </Popover>
              </div>
            ) : (
              <div className="d-flex flex-direction-row gap-10 align-c">
                <Button ghost>
                  <SignOpenModal user={user} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
      <Layout.Footer
        className="d-flex just-c align-c flex-direction-c"
        style={{ backgroundColor: "lightGray", height: "20px" }}
      >
        <Space>
          <IconFont type="icon-facebook" />
          <IconFont type="icon-twitter" />
          <YoutubeOutlined />
          <InstagramOutlined />
        </Space>
        <div className="d-flex  flex-direction-row">
          <CopyrightOutlined />
          Copyrigth 2023
        </div>
      </Layout.Footer>
    </Layout>
  );
};
