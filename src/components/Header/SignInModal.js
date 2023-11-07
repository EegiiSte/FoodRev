import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { myAuthentication } from "../../firebase/myFirebase.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Pages/product/comment/comment.css";
const validateForm = yup.object().shape({
  email: yup.string().email("Invalid email address").required(),
  password: yup
    .string()
    // .min(6, "Must be more than 6 character")

    .required(),
});

function SignInModal(props) {
  const { user } = props;
  const navigate = useNavigate();
  //   const navigateToSignUpPage = () => {
  //     navigate("/sign-up");
  //   };

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    checkbox: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    checkbox: "",
  });
  const [colorErrors, setColorErrors] = useState({
    email: "",
    password: "",
    checkbox: "",
  });

  const HandleIput = (e) => {
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
        console.log("This is error");
        console.log(error.message);
        setFormErrors({ ...formErrors, [name]: error.message });
        setColorErrors({ ...colorErrors, [name]: "red" });
      });
    setFormValues({ ...formValues, [name]: value });
  };

  const HandleCheckBox = (e) => {
    setFormValues({ ...formValues, checkbox: e.target.checked });
    console.log(e);
  };

  const handleSignIn = async (e) => {
    if (
      formValues.email === "" ||
      formValues.password === ""
      //   formValues.checkbox === false
    ) {
      setFormErrors({
        ...formErrors,
        required: "All inputs must be required",
        // confirmPassword: "",
      });
    } else if (formValues.checkbox === false) {
      setFormValues({ ...formValues, email: "", password: "" });
    } else if (
      formErrors.email !== "" ||
      formErrors.password !== "" ||
      formErrors.checkbox === false
    ) {
      setFormErrors({ ...formErrors, required: "All error must be cleared" });
    } else {
      setFormErrors({ ...formErrors, required: "" });
      await signInWithEmailAndPassword(
        myAuthentication,
        formValues.email,
        formValues.password
      )
        .then((res) => {
          toast.success(
            `Hello ${props.user.userName} Your Sign in successfull !`,
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          navigate("/");
        })
        .catch((err) => {
          setFormErrors({
            ...formErrors,
            required: "Email or password incorect",
          });
          setFormValues({ ...formValues, password: "" });
        });
    }
  };
  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(myAuthentication, provider)
      .then((res) => {
        toast.success(
          `Hello ${props.user.displayName} Your Google Sign in successfull !`,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );

        navigate("/");
      })
      .catch((err) => {
        setColorErrors({ ...formErrors, required: err.message });
      });
  };

  return (
    <div>
      <div className="inputBox">
        <div className="signbox">
          <h1 className="lineName">Email Address</h1>
          <input
            className="inputLineEmail"
            placeholder="Enter Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={HandleIput}
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
            onChange={HandleIput}
            style={{ border: `2px solid ${colorErrors.password}` }}
          ></input>
          <h1 id="notificationPassword">{formErrors.password}</h1>
        </div>
        <div className="CheckBoxContainer">
          <div className="checkBox">
            <input
              type="checkbox"
              className="checkBoxButton"
              checked={formValues.checkbox}
              onClick={HandleCheckBox}
            ></input>
            <h1 className="notiwords">Remember email</h1>
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
        <div></div>
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
          <button className="SignButton" onClick={handleSignIn}>
            Sign In
          </button>
          <h6 id="notificationRequiredBox">{formErrors.required}</h6>
        </div>
      </div>

      <div className="footerBox">
        <div className="signToBox">
          <button className="signToButton" onClick={handleSignInWithGoogle}>
            Sign in with Google
          </button>
          <button className="signToButton">Sign in with Apple</button>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
