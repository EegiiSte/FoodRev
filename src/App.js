import "./App.css";
import "./sign.css";
import SignIn from "./SignIn";
import SignUp from "./signUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/homePage";
import { useEffect, useState } from "react";
import { myAuthentication } from "./firebase/myFirebase";
import ContactsPage from "./Pages/Contacts/contactsPage";
import ProductsPage from "./Pages/Products/productsPage";
import ProfilesPage from "./Pages/Profile/profilesPage";
import ServicesPage from "./Pages/Services/servicesPage";

import Product from "./Pages/product/Product";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = myAuthentication.onAuthStateChanged((user) => {
      // console.log("useruseEffect working");
      // console.log("user");
      if (user) {
        setIsUserLoggedIn(true);

        setUser(user);
      } else {
        setIsUserLoggedIn(false);
        setUser(false);
      }
      setLoading(false);
    });
    return () => getUser();
  }, []);

  return (
    <div>
      {loading && <div>Loading Page Bro</div>}
      <BrowserRouter>
        {!loading && isUserLoggedIn && (
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/products" element={<ProductsPage user={user} />} />
            <Route path="/products/:id" element={<Product user={user} />} />
            <Route path="/contacts" element={<ContactsPage user={user} />} />
            <Route path="/services" element={<ServicesPage user={user} />} />
            <Route path="/profile" element={<ProfilesPage user={user} />} />
          </Routes>
        )}
        {!loading && !isUserLoggedIn && (
          <Routes>
            <Route path="/sign-up" element={<SignUp user={user} />} />
            <Route path="/" element={<SignIn user={user} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
