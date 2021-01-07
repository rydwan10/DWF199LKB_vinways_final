import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { AppContext } from "./context/appContext";
import { AUTH_ERROR, USER_LOADED } from "./constant/actionTypes";

// private route
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PreventToLoginRoute from "./components/PreventToLoginRoute/PreventToLoginRoute";

// pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AddArtistPage from "./pages/AddArtistPage";
import AddMusicPage from "./pages/AddMusicPage";
import UploadPaymentPage from "./pages/UploadPaymentPage";
import TransactionsPage from "./pages/TransactionsPage";
import Logout from "./pages/Logout";

// components
import Navbar from "./components/Navbar/Navbar";

// API and setAuthToken Function
import { API, setAuthToken } from "./config/api";

// Check token if exist
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AppContext);

  const loadUser = async () => {
    try {
      const response = await API("/check-auth");
      dispatch({
        type: USER_LOADED,
        payload: {
          user: response.data.data,
        },
      });
    } catch (err) {
      console.log(err);
      if (err) {
        return dispatch({
          type: AUTH_ERROR,
        });
      }
    }
  };
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      {state.isLogin ? <Navbar /> : null}
      <Switch>
        <PreventToLoginRoute exact path="/login" component={LoginPage} />
        <PreventToLoginRoute exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/add-artist" component={AddArtistPage} />
        <PrivateRoute exact path="/add-music" component={AddMusicPage} />
        <PrivateRoute exact path="/transactions" component={TransactionsPage} />
        <PrivateRoute exact path="/pay" component={UploadPaymentPage} />
      </Switch>
    </Router>
  );
}

export default App;
