import { useContext } from "react";
import { AppContext } from "../../context/appContext";

import { Route, Redirect } from "react-router-dom";

const PreventToLoginRoute = ({ component: Component, ...rest }) => {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLogin ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PreventToLoginRoute;
