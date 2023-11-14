import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { myAuthentication } from "../firebase/myFirebase";

const userContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = myAuthentication.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLoggedIn(true);

        setUser(user);
        if (user && user.email === "elektronjaal@gmail.com") {
          setIsAdmin(true);
        }
      } else {
        setIsUserLoggedIn(false);
        setIsAdmin(false);
        setUser(false);
      }
      setLoading(false);
    });
    return () => getUser();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        isUserLoggedIn,
        loading,
        isAdmin,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
