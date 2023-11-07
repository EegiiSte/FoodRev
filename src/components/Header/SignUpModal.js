import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  myAuthentication,
  usersCollection,
} from "../../firebase/myFirebase.js";
const validateForm = yup.object().shape({
  name: yup
    .string()
    .min(4, "must be at least 4 characters")
    .max(10, "must be less than 10 characters")
    .required("Test"),
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

function SignUpModal(props) {
  const { user } = props;

  const navigate = useNavigate();
  const navigateToSignInPage = () => {
    // navigate("/");
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
        // setColorErrors({ ...colorErrors, [name]: "Green" });
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
        setColorErrors({ ...colorErrors, [e.target.name]: "green" });
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
        // confirmPassword: "",
        // checkbox: "must be checked",
        // name: "must be required",
        // email: "must be required",
        // password: "must be required",
        // comfirmPassword: "must be required",
      });
    } else if (formValues.checkbox === false) {
      setFormErrors({
        ...formErrors,
        checkBox: "must be checked",
      });
    } else if (formValues.checkbox !== false) {
      setFormErrors({
        ...formErrors,
        checkBox: "",
      });
    } else if (formValues.name !== "") {
      setFormErrors({
        ...formErrors,
        name: "",
        required: "All error must be cleared",
      });
    } else if (
      formValues.email !== "" ||
      formValues.password !== "" ||
      formValues.confirmPassword !== "" ||
      formValues.checkbox !== ""
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
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
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
      </div>
      <div className="CheckBoxContainer">
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
        <div className="notiwords" id="showPasswordBox">
          Show Password
          <input
            type="checkbox"
            checked={showPassword}
            onClick={handleShowPassword}
          />
        </div>
      </div>
      <div>
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
    </div>
  );
}

export default SignUpModal;
