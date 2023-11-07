import { createContext, useContext, useEffect, useState } from "react";
import { myAuthentication } from "../firebase/myFirebase";

const userContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;
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
    <userContext.Provider value={{ user, isUserLoggedIn, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
