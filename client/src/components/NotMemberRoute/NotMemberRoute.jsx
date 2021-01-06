import { useContext } from "react";
import { AppContext } from "../../context/appContext";

import { Route, Redirect } from "react-router-dom";

const NotMemberRoute = ({ component: Component, ...rest }) => {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !state.currentUser.isMember && state.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="login" />
        )
      }
    />
  );
};

export default NotMemberRoute;
