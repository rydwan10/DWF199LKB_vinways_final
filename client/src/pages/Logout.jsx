import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { Redirect } from "react-router-dom";

const Logout = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(AppContext);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    const dispatchLogout = () => {
      dispatch({
        type: "LOGOUT",
      });
      setIsLogout(true);
    };
    dispatchLogout();
  }, []);

  return isLogout && <Redirect to="/login" />;
};

export default Logout;
