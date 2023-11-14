import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ContactPage from "./Pages/Contact/ContactPage";
import HomePage from "./Pages/Home/homePage";
import ProductsPage from "./Pages/Products/productsPage";
import ProfilesPage from "./Pages/Profile/profilesPage";
import "./sign.css";
import SignIn from "./SignIn";
import SignUp from "./signUp";
import Product from "./Pages/Product/Sub-product/Product";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "./context/UserContext";
import AdminPage from "./Pages/Admin/AdminPage";
import { HomeNewPage } from "./Pages/HomeNew/HomeNewPage";

const App = () => {
  const { user, isUserLoggedIn, isAdmin, loading } = useUserContext();

  return (
    <div>
      {loading && <div>Loading Page Bro</div>}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomeNewPage user={user} isUserLoggedIn={isUserLoggedIn} />
            }
          />
          <Route
            path="/old_home"
            element={<HomePage user={user} isUserLoggedIn={isUserLoggedIn} />}
          />
          {!loading && isUserLoggedIn && (
            <Route>
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<Product user={user} />} />
              <Route path="/contact" element={<ContactPage user={user} />} />
              <Route path="/profile" element={<ProfilesPage user={user} />} />
              {isAdmin && <Route path="/admin" element={<AdminPage />} />}
            </Route>
          )}
          {!loading && !isUserLoggedIn && (
            <Route>
              <Route path="/sign-up" element={<SignUp user={user} />} />
              <Route
                path="/sign-in"
                element={<SignIn user={user} isUserLoggedIn={isUserLoggedIn} />}
              />
              <Route
                path="/"
                element={
                  <HomePage user={user} isUserLoggedIn={isUserLoggedIn} />
                }
                // element={<SignIn user={user} isUserLoggedIn={isUserLoggedIn} />}
              />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
