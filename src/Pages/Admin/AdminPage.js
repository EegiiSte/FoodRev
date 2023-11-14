import React, { useEffect, useState } from "react";

import { MessageOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";
import { contactCollection } from "../../firebase/myFirebase";
import { LayoutMain } from "../../layout/LayoutMain";

function AdminPage(props) {
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [contactsData, setContactsData] = useState();

  console.log("AdminPage>contactsData", contactsData);

  const getData = async () => {
    setLoading(true);
    onSnapshot(contactCollection, (collection) => {
      const firebaseDocData = collection.docs.map((doc) => {
        return { ...doc.data(), contactId: doc.id };
      });
      setContactsData(firebaseDocData);
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const hanldeDeleteMessage = async (contactId) => {
    await deleteDoc(doc(contactCollection, contactId))
      .then(async (res) => {
        console.log(res);

        toast.warn("Message deleted successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LayoutMain>
      <Layout
        style={{
          height: "calc(100vh - 64px - 50px)",
        }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <MessageOutlined />,
                label: "Contact Messages",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              overflow: "scroll",
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <div className="d-flex flex-direction-c gap-10  ">
              {loading && <div>loading ...</div>}
              {!loading &&
                contactsData?.map((contact, index) => {
                  return (
                    <div
                      className="d-flex align-c flex-direction-row  borderR5 box-shadow-gray "
                      style={{ height: "60px" }}
                      key={index}
                    >
                      <div
                        className="d-flex align-c"
                        style={{ width: "5%", paddingLeft: "10px" }}
                      >
                        <img
                          style={{ height: "50px", borderRadius: "50%" }}
                          className="userImageAdminPage"
                          src={contact.userImage}
                          alt=""
                        />
                      </div>
                      <div style={{ width: "20%" }}>
                        <div>:{contact.name}</div>
                      </div>
                      <div style={{ width: "20%" }}>
                        <div>:{contact.email}</div>
                      </div>
                      <div style={{ width: "45%" }}>
                        <div>Message:{contact.message}</div>
                      </div>
                      <div style={{ width: "5%" }}>
                        <button
                          onClick={(e) => {
                            hanldeDeleteMessage(contact.contactId);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Content>
        </Layout>
      </Layout>
    </LayoutMain>
  );
}

export default AdminPage;
