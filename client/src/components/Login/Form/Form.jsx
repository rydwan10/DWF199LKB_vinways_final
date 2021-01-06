import { useContext, useState } from "react";
import { AppContext } from "../../../context/appContext";
import { LOGIN, SET_MODAL } from "../../../constant/actionTypes";

import { Grid, Button, TextField, Typography } from "@material-ui/core";
import Modal from "../../Modal/Modal";
import makeStyles from "./style";

// API
import { API, setAuthToken } from "../../../config/api";

function Form() {
  //eslint-disable-next-line
  const [state, dispatch] = useContext(AppContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { email, password } = input;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (input.email.trim() === "" || input.password.trim() === "") {
      dispatch({
        type: SET_MODAL,
        payload: { isOpen: true, message: "Email or password must not Empty!" },
      });
    } else {
      try {
        const body = JSON.stringify({ email, password });
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await API.post("/login", body, config).catch((err) => {
          dispatch({
            type: SET_MODAL,
            payload: {
              isOpen: true,
              // message: err.response.data.error.message,
              message: "Email or password is invalid!",
            },
          });
        });

        setAuthToken(response.data.data.token);
        dispatch({
          type: LOGIN,
          payload: {
            user: response.data.data,
          },
        });
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  const classes = makeStyles();

  return (
    <>
      <Modal />
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography className={classes.loginTitle} variant="h4">
          Login
        </Typography>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid style={{ width: "100%" }} item>
            <TextField
              className={classes.inputField}
              variant="outlined"
              size="small"
              type="email"
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              style={{ width: "100%" }}
              placeholder="Email"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid style={{ width: "100%" }} item>
            <TextField
              className={classes.inputField}
              variant="outlined"
              size="small"
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              style={{ width: "100%" }}
              type="password"
              placeholder="Password"
            />
          </Grid>
        </Grid>

        <Grid container>
          <Button
            type="submit"
            className={classes.loginButton}
            size="medium"
            variant="contained"
          >
            Login
          </Button>
        </Grid>
      </form>
    </>
  );
}

export default Form;
