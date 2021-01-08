import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import "./App.css";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import LogApplication from "./components/WithoutLogged/WithoutLoggedApplication";
import LoggedinApplication from "./components/Logged/LoggedApplication";


const App = () => {
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(logoutUser());
      }
      setIsLoading(false);
    } else setIsLoading(false);
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : isAuthenticated ? (
          <LoggedinApplication />
      ) : (
          <LogApplication />
      )}
    </>
  );
};

export default App;
