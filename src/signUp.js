import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { myAuthentication, usersCollection } from "./firebase/myFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import Header from "./components/Header/Header";
const validateForm = yup.object().shape({
  name: yup
    .string()
    .min(4, "must be at least 4 characters")
    .max(10, "must be less than 10 characters")
    .required(),
  email: yup.string().email("Invalid email address").required(),
  password: yup
    .string()
    .min(6, "Must be more than 6 character")

    .required(),

  confirmPassword: yup
    .string()
    .min(6, "Must be more than 6 character")

    .required(),
  checkbox: yup.boolean().oneOf([true], "zaaval check hii"),
});

function SignUp(props) {
  const navigate = useNavigate();
  const navigateToSignInPage = () => {
    navigate("/");
  };

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkbox: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkbox: "",
    required: "",
  });

  const [colorErrors, setColorErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkbox: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    yup
      .reach(validateForm, name)
      .validate(value)
      .then((response) => {
        setFormValues({ ...formValues, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
        setColorErrors({ ...colorErrors, [name]: "Green" });
      })
      .catch((error) => {
        setFormErrors({ ...formErrors, [name]: error.message });
        setColorErrors({ ...colorErrors, [name]: "red" });
      });
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckBox = (e) => {
    yup
      .reach(validateForm, e.target.name)
      .validate(e.target.checked)
      .then((response) => {
        setFormErrors({ ...formErrors, [e.target.name]: "" });
        setColorErrors({ ...colorErrors, [e.target.name]: "Green" });
      })
      .catch((error) => {
        setFormErrors({ ...formErrors, [e.target.name]: error.message });
        setColorErrors({ ...colorErrors, [e.target.name]: "red" });
      });

    setFormValues({ ...formValues, checkbox: e.target.checked });
  };

  const handleSignUp = async (e) => {
    if (formValues.password !== formValues.confirmPassword) {
      // checks if password matches with confirmPassword
      setFormErrors({
        ...formErrors,
        confirmPassword: "Must match with the password",
      });
    } else if (
      // checks if any inputs are empty
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.password === "" ||
      formValues.confirmPassword === "" ||
      formValues.checkbox === false
    ) {
      setFormErrors({
        ...formErrors,
        required: "All inputs must be required",
        confirmPassword: "",
      });
    } else if (
      // checks if there is any errors
      formErrors.name !== "" ||
      formErrors.email !== "" ||
      formErrors.password !== "" ||
      formErrors.confirmPassword !== "" ||
      formErrors.checkbox !== ""
    ) {
      setFormErrors({ ...formErrors, required: "All error must be cleared" });
    } else {
      setFormErrors({ ...formErrors, required: "" });
      await createUserWithEmailAndPassword(
        myAuthentication,
        formValues.email,
        formValues.password
      )
        .then((res) => {
          const userId = res.user.uid;
          addDoc(usersCollection, {
            userId: userId,
            email: formValues.email,
            name: formValues.name,
          });
          navigate("/sign-in");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="body ">
      <Header user={props.user} />
      <div className="mainBox borderRed">
        <div className="headBox">
          <h1 className="header">Get Started Now</h1>
        </div>
        <div className="inputBox">
          <div className="signbox">
            <h1 className="lineName">Name</h1>
            <input
              className="inputLineName"
              placeholder="Enter Name"
              type="email"
              name="name"
              value={formValues.name}
              onChange={handleInput}
              style={{ border: `2px solid ${colorErrors.name}` }}
            ></input>
            <h1 id="notificationEmail">{formErrors.name}</h1>
          </div>
          <div className="signbox">
            <h1 className="lineName">Email Address</h1>
            <input
              className="inputLineEmail"
              placeholder="Enter Email"
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInput}
              style={{ border: `2px solid ${colorErrors.email}` }}
            ></input>
            <h1 id="notificationEmail">{formErrors.email}</h1>
          </div>
          <div className="signbox">
            <h1 className="lineName">Password</h1>
            <input
              className="inputLinePassword"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleInput}
              style={{ border: `2px solid ${colorErrors.password}` }}
            ></input>
            <h1 id="notificationPassword">{formErrors.password}</h1>
          </div>
          <div className="signbox">
            <h1 className="lineName">Comfirm Password</h1>
            <input
              className="inputLinePassword"
              placeholder="Enter Confirm Password"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleInput}
              style={{
                border: `2px solid ${colorErrors.confirmPassword}`,
              }}
            ></input>
            <h1 id="notificationPassword">{formErrors.confirmPassword}</h1>
          </div>
          <div className="notiwords" id="showPasswordBox">
            Show Password
            <input
              type="checkbox"
              checked={showPassword}
              onClick={handleShowPassword}
            />
          </div>
          <div className="checkBox">
            <input
              type="checkbox"
              name="checkbox"
              className="checkBoxButton"
              checked={formValues.checkbox}
              onClick={handleCheckBox}
            ></input>
            <h1 className="notiwords">Agree term and Condition</h1>
          </div>
          <div>
            <h1
              id="notificationCheckBox"
              className="notiwords"
              style={{ borderBlockColor: colorErrors.checkbox }}
            >
              {formErrors.checkbox}
            </h1>
          </div>
          <div className="signButtonBox">
            <button className="SignButton" onClick={handleSignUp}>
              Sign Up
            </button>
            <h6 id="notificationRequiredBox">{formErrors.required}</h6>
          </div>
        </div>
        <div className="footerBox, notiwords, orLineBox">
          <div className="orLine"></div>
          <div>or</div>
          <div className="orLine"></div>
        </div>
        <div className="footerBox">
          <div className="signToBox">
            <button className="signToButton">Sign in with Google</button>
            <button className="signToButton">Sign in with Apple</button>
          </div>
          <div className="footerBottomBox">
            <h6 className="notiwords"> Have an account</h6>
            <button onClick={navigateToSignInPage} className="footerToSign">
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="mainSecondBox"></div>
    </div>
  );
}

export default SignUp;
