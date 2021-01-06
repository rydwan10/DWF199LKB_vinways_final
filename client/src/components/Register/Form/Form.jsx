import { useContext, useState } from "react";
import { AppContext } from "../../../context/appContext";
import {
  REGISTER,
  SET_MODAL,
  SET_LOADING,
} from "../../../constant/actionTypes";

import { API } from "../../../config/api";
import { Grid, Button, TextField, Typography } from "@material-ui/core";

import Modal from "../../Modal/Modal";
import makeStyles from "./style";

function Form() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    retypePassword: "",
    fullName: "",
  });
  // eslint-disable-next-line
  const [state, dispatch] = useContext(AppContext);
  const classes = makeStyles();

  const { email, password, fullName } = input;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      input.email.trim() === "" ||
      input.password.trim() === "" ||
      input.retypePassword.trim() === "" ||
      input.fullName.trim() === ""
    ) {
      dispatch({
        type: SET_MODAL,
        payload: { isOpen: true, message: "All field must not empty!" },
      });
    } else if (input.password !== input.retypePassword) {
      dispatch({
        type: SET_MODAL,
        payload: {
          isOpen: true,
          message: "Password doesn't match with retype password!",
        },
      });
    } else {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        const body = JSON.stringify({ email, password, fullName });
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await API.post("/register", body, config);

        dispatch({
          type: REGISTER,
          payload: {
            user: response.data.data,
          },
        });

        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
          dispatch({
            type: SET_MODAL,
            payload: {
              isOpen: true,
              message: "Email already registered!",
            },
          });
        }
      }
    }
  };

  return (
    <>
      <Modal />
      <form
        onSubmit={handleRegister}
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography className={classes.loginTitle} variant="h4">
          Register
        </Typography>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item style={{ width: "100%" }}>
            <TextField
              size="small"
              variant="outlined"
              className={classes.inputField}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              style={{ width: "100%" }}
              placeholder="Email"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item style={{ width: "100%" }}>
            <TextField
              size="small"
              variant="outlined"
              className={classes.inputField}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              style={{ width: "100%" }}
              type="password"
              placeholder="Password"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item style={{ width: "100%" }}>
            <TextField
              size="small"
              variant="outlined"
              className={classes.inputField}
              onChange={(e) =>
                setInput({ ...input, retypePassword: e.target.value })
              }
              style={{ width: "100%" }}
              type="password"
              placeholder="Re-type Password"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="flex-end">
          <Grid style={{ width: "100%" }} item>
            <TextField
              size="small"
              variant="outlined"
              className={classes.inputField}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
              style={{ width: "100%" }}
              placeholder="Full Name"
            />
          </Grid>
        </Grid>

        <Grid container>
          <Button
            className={classes.loginButton}
            size="medium"
            variant="contained"
            type="submit"
          >
            Register
          </Button>
        </Grid>
      </form>
    </>
  );
}

export default Form;
