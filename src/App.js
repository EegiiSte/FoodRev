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
import { useUserContext } from "./context/UserContext";

const App = () => {
  const { user, isUserLoggedIn, loading } = useUserContext();

  return (
    <div>
      {loading && <div>Loading Page Bro</div>}
      <BrowserRouter>
        {!loading && isUserLoggedIn && (
          <Routes>
            <Route
              path="/"
              element={<HomePage user={user} isUserLoggedIn={isUserLoggedIn} />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<Product user={user} />} />
            <Route path="/contacts" element={<ContactsPage user={user} />} />
            <Route path="/services" element={<ServicesPage user={user} />} />
            <Route path="/profile" element={<ProfilesPage user={user} />} />
          </Routes>
        )}
        {!loading && !isUserLoggedIn && (
          <Routes>
            <Route path="/sign-up" element={<SignUp user={user} />} />
            <Route
              path="/sign-in"
              element={<SignIn user={user} isUserLoggedIn={isUserLoggedIn} />}
            />
            <Route
              path="/"
              element={<HomePage user={user} isUserLoggedIn={isUserLoggedIn} />}
              // element={<SignIn user={user} isUserLoggedIn={isUserLoggedIn} />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
