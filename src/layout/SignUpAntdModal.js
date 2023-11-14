import { Modal, Form, Input, Checkbox, Button } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { myAuthentication, usersCollection } from "../firebase/myFirebase.js";
import { addDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export const SignUpAntdModal = (props) => {
  // const [signUpModalShow, setSignUpModalShow] = useState(false);

  // const handleSignUpModalCancel = () => {
  //   setSignUpModalShow(false);
  // };

  const onFinish = async (values) => {
    // console.log("SignUpAntdModal > onFinish", { values: values });

    const res = await createUserWithEmailAndPassword(
      myAuthentication,
      values.email,
      values.password
    );

    const userId = res.user.uid;
    addDoc(usersCollection, {
      userId: userId,
      email: values.email,
      name: values.name,
    });
    Navigate("/");
    props.onHide();
  };

  return (
    <Modal
      title="SignUp"
      open={props.signUpModalShow}
      onCancel={() => {
        props.onHide();
      }}
      footer={null}
      destroyOnClose={true}
    >
      <br />
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={(errorInfo) => {
          console.log("SignUpAntdModal > onFinishFailed:", errorInfo);
        }}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>
            <a
              href="https://www.contractscounsel.com/t/us/agreement-terms-and-conditions"
              target="_blank"
              rel="noreferrer"
            >
              Aree term and Condition
            </a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUpAntdModal;
