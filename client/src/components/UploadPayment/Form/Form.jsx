import { useState, useContext } from "react";
import { AppContext } from "../../../context/appContext";
import { SET_MODAL, SET_LOADING } from "../../../constant/actionTypes";
import { API } from "../../../config/api";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import attachThumbnail from "../../../assets/icons/attachThumbnail.svg";

import Modal from "../../Modal/Modal";

import makeStyles from "./style";

function Form() {
  const [state, dispatch] = useContext(AppContext);
  const [attachProof, setAttachProof] = useState(null);
  const [input, setInput] = useState({
    accountNumber: "",
    proofOfTransaction: "",
    proofFileName: "",
  });
  const userId = state.user.id;
  const classes = makeStyles();

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.accountNumber === "" || input.proofOfTransaction == null) {
      dispatch({
        type: SET_MODAL,
        payload: {
          isOpen: true,
          message: "Account number and proof of transaction is required!",
        },
      });
    } else {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        const { accountNumber, proofOfTransaction } = input;
        const body = new FormData();
        console.log(userId);
        body.append("userId", userId);
        body.append("accountNumber", accountNumber);
        body.append("proofOfTransaction", proofOfTransaction);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await API.post("/transactions", body, config);
        if (response.status === 201) {
          dispatch({
            type: SET_LOADING,
            payload: false,
          });
          dispatch({
            type: SET_MODAL,
            payload: {
              isOpen: true,
              message: "Please wait until admin approve your request",
            },
          });
          setInput({
            accountNumber: "",
            proofOfTransaction: "",
            proofFileName: "",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Modal />
      <form
        onSubmit={handleSend}
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography className={classes.loginTitle} variant="h4">
          Premium
        </Typography>
        <Typography className={classes.subTitile} variant="body1">
          Bayar sekarang dan nikmati streaming musik yang kekinian dari{" "}
          <span className={classes.boldCompany}>
            Co <span className={classes.greenText}>Ways</span>
          </span>
        </Typography>
        <Typography className={classes.contactNumber} variant="h5">
          <span className={classes.boldCompany}>
            Co <span className={classes.greenText}>Ways</span> : 0981312323
          </span>
        </Typography>

        <div className={classes.inputWrapper}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid style={{ width: "100%" }} item>
              <TextField
                required
                className={classes.inputField}
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                placeholder="Input your account number"
                value={input.accountNumber}
                onChange={(e) =>
                  setInput({ ...input, accountNumber: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <Grid container justify="space-between" style={{ marginTop: "1rem" }}>
            <Grid item>
              <input
                required
                onChange={(e) => {
                  setAttachProof(URL.createObjectURL(e.target.files[0]));
                  setInput({
                    ...input,
                    proofOfTransaction: e.target.files[0],
                    proofFileName: e.target.files[0].name,
                  });
                }}
                accept="image/*"
                className={classes.input}
                style={{ display: "none" }}
                id="file-input-thumbnail"
                multiple
                type="file"
              />
              <div>
                <label
                  htmlFor="file-input-thumbnail"
                  className={classes.fileInputButton}
                >
                  {attachProof == null
                    ? "Attach Proof of Transfer"
                    : `${input.proofFileName}`}
                  <img src={attachThumbnail} alt="attach thumbnail icon" />
                </label>
              </div>
            </Grid>
            <Grid item>
              {attachProof ? (
                <img
                  src={attachProof}
                  alt="attachThumbnail-icon"
                  width="128px"
                />
              ) : (
                <div
                  style={{
                    width: "128px",
                    height: "128px",
                    backgroundColor: "rgb(51 51 70 / 75%)",
                  }}
                ></div>
              )}
            </Grid>
          </Grid>
        </div>

        <Grid container>
          <Button
            type="submit"
            className={classes.sendButton}
            size="medium"
            variant="contained"
          >
            Send
          </Button>
        </Grid>
      </form>
    </>
  );
}

export default Form;
